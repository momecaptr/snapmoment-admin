'use client';

import { ApolloProvider } from '@apollo/client';
// import client from '../apollo-client';
import { Provider } from 'react-redux';
// import { makeStore } from '../src/myApp/store/store';
import { Toaster } from 'sonner';
import { ReactNode, useRef } from 'react';
import client from "../../apollo-client";
import {makeStore} from "@/myApp/store/store";

export function Providers({ children }: { children: ReactNode }) {
  const storeRef = useRef(makeStore()); // Создаём store только один раз

  return (
    <ApolloProvider client={client}>
      <Provider store={storeRef.current}>
        {children}
        <Toaster position="bottom-left" />
      </Provider>
    </ApolloProvider>
  );
}