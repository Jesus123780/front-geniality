import {
  createContext,
  useMemo,
  useState
} from 'react'


export const Context = createContext({})

type ContextProps = {
    children: React.ReactNode
}

const Provider = ({ children }: ContextProps) => {
  // STATE
  type IMessagesToast = {
    id?: string
    title?: string
    description: string
    backgroundColor: string
  }
  const [messagesToast, setMessagesToast] = useState<IMessagesToast[]>([])

  const sendNotification = useMemo(
    () => ({
      title = '',
      description = '',
      backgroundColor = ''
    }) => {
      if (messagesToast.length >= 10) {
        const deleteToast = (id: string) => {
          const listItemIndex = messagesToast.findIndex((e) => e.id === id);
          messagesToast.splice(listItemIndex, 1);
          setMessagesToast([...messagesToast]);
        };
        if (messagesToast[0].id) {
          deleteToast(messagesToast[0].id);
        }
      }
      const id = Math.floor(Math.random() * 101 + 1);
      const newMessage = {
        id: id?.toString(),
        title: title?.toString() || '',
        backgroundColor,
        description
      };
      setMessagesToast([...messagesToast, newMessage]);
    },
    [messagesToast, setMessagesToast]
  )

  const value = useMemo(() => { return { sendNotification } }, [sendNotification])

  return (
    <Context.Provider value={value}>
        {children}
    </Context.Provider>
  )
}

export { Provider }

