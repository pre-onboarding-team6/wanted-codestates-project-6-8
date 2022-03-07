import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

export interface Ilist {
  contents: string;
  emdNm: string;
  fcAddr: string;
  fcAddrDetail: string;
  fcGbn: string;
  fcNm: string;
  fcNo: number;
  ref1: string;
  ref2: string;
  ref3: string;
  sggNm: string;
  siNm: string;
  wDate: string;
  xp: string;
  yp: string;
  zip: string;
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
    Object.prototype.hasOwnProperty.call(object, 'contents') &&
    Object.prototype.hasOwnProperty.call(object, 'emdNm') &&
    Object.prototype.hasOwnProperty.call(object, 'fcAddr') &&
    Object.prototype.hasOwnProperty.call(object, 'fcAddrDetail') &&
    Object.prototype.hasOwnProperty.call(object, 'fcGbn') &&
    Object.prototype.hasOwnProperty.call(object, 'fcNm') &&
    Object.prototype.hasOwnProperty.call(object, 'fcNo') &&
    Object.prototype.hasOwnProperty.call(object, 'ref1') &&
    Object.prototype.hasOwnProperty.call(object, 'ref2') &&
    Object.prototype.hasOwnProperty.call(object, 'ref3') &&
    Object.prototype.hasOwnProperty.call(object, 'sggNm') &&
    Object.prototype.hasOwnProperty.call(object, 'siNm') &&
    Object.prototype.hasOwnProperty.call(object, 'wDate') &&
    Object.prototype.hasOwnProperty.call(object, 'xp') &&
    Object.prototype.hasOwnProperty.call(object, 'yp') &&
    Object.prototype.hasOwnProperty.call(object, 'zip') &&
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
