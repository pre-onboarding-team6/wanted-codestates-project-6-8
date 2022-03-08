import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

export interface Ilist {
  경도: string;
  관할: string;
  기준일: string;
  위도: string;
  전화번호: string;
  휴양림_명칭: string;
  휴양림_주소: string;
}

export interface IlistWithMemo extends Ilist {
  id: number;
  memo: string;
}

export interface IaddList {
  ({ selectedList, memo }: { selectedList: Ilist; memo: string }): void;
}

export interface IdeleteList {
  (id: number): void;
}

export interface IeditList {
  ({ id, memo }: { id: number; memo: string }): void;
}

export interface IlistContext {
  list: IlistWithMemo[];
  addList: IaddList;
  deleteList: IdeleteList;
  editList: IeditList;
}

export interface Ichildren {
  children: ReactNode;
}

const isListWithMemo = (object: any): object is IlistWithMemo => {
  return (
    Object.prototype.hasOwnProperty.call(object, '경도') &&
    Object.prototype.hasOwnProperty.call(object, '관할') &&
    Object.prototype.hasOwnProperty.call(object, '기준일') &&
    Object.prototype.hasOwnProperty.call(object, '위도') &&
    Object.prototype.hasOwnProperty.call(object, '전화번호') &&
    Object.prototype.hasOwnProperty.call(object, '휴양림_명칭') &&
    Object.prototype.hasOwnProperty.call(object, '휴양림_주소') &&
    Object.prototype.hasOwnProperty.call(object, 'id') &&
    Object.prototype.hasOwnProperty.call(object, 'memo')
  );
};

const isListWithMemoArray = (array: any): array is IlistWithMemo[] => {
  if (!Array.isArray(array)) return false;
  return array.every((el) => isListWithMemo(el));
};

export const ListContext = createContext<IlistContext>({
  list: [],
  addList: () => {},
  deleteList: () => {},
  editList: () => {},
});

export const ListProvider = ({ children }: Ichildren) => {
  const [list, setList] = useState<IlistWithMemo[]>([]);

  const setInitialList = useCallback(() => {
    localStorage.setItem('list', JSON.stringify([]));
    setList([]);
  }, [setList]);

  const getList = useCallback(() => {
    const localList = localStorage.getItem('list');
    if (localList) {
      const parsedList = JSON.parse(localList);
      if (Array.isArray(parsedList) && isListWithMemoArray(parsedList)) {
        setList(parsedList);
      } else {
        console.warn('list 형식이 올바르지 않습니다. list를 새로 생성합니다.');
        setInitialList();
      }
    } else {
      console.warn('list가 존재하지 않습니다. list를 새로 생성합니다.');
      setInitialList();
    }
  }, [setInitialList]);

  useEffect(() => {
    getList();
  }, [getList]);

  const saveList = (newList: IlistWithMemo[]) => {
    setList(newList);
    localStorage.setItem('list', JSON.stringify(newList));
  };

  const addList = ({
    selectedList,
    memo,
  }: {
    selectedList: Ilist;
    memo: string;
  }) => {
    const listWithMemo = {
      ...selectedList,
      id: Date.now(),
      memo,
    };
    saveList([...list, listWithMemo]);
  };

  const deleteList = (id: number) => {
    const localList = localStorage.getItem('list');
    if (localList) {
      const parsedList = JSON.parse(localList);
      if (Array.isArray(parsedList) && isListWithMemoArray(parsedList)) {
        saveList(parsedList.filter((item) => item.id !== id));
      } else {
        throw new Error('저장된 list값이 올바르지 않습니다.');
      }
    } else {
      throw new Error('list를 읽을 수 없습니다.');
    }
  };

  const editList = ({ id, memo }: { id: number; memo: string }) => {
    const localList = localStorage.getItem('list');
    if (localList) {
      const parsedList = JSON.parse(localList);
      if (Array.isArray(parsedList) && isListWithMemoArray(parsedList)) {
        const newList = parsedList.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            const newItem = {
              ...item,
              memo,
            };
            return newItem;
          }
        });
        saveList(newList);
      } else {
        throw new Error('저장된 list값이 올바르지 않습니다.');
      }
    } else {
      throw new Error('list를 읽을 수 없습니다.');
    }
  };

  return (
    <ListContext.Provider
      value={{
        list,
        addList,
        deleteList,
        editList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
