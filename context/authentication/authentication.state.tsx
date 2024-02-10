import React from "react";
import { useStorageState } from "@/utils/storage-utils";
import AuthContext from "./authentication.context";
import { router } from "expo-router";
import { getDataAPI } from 'services/fetch.service';
import { db } from '@/services/db.service';

export function SessionProvider(props: { children: React.ReactNode }) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (user,pass) => {

          getDataAPI('secure', 'bares', {'user':user, 'pass': pass})
            .then(data => {
              if (data.success) {
                setSession(data.apiKey);

              }
            });

          router.push("/one");
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
