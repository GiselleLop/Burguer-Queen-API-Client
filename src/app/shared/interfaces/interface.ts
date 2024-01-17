export interface Auth {
  accessToken: string | undefined;
  user:{
    email: string;
    role: string;
    id: number;
  };
}

export interface userInterface {
  user:{
    email: string;
    password: string;
    role: string;
    id: number;
  };
}

// export interface user {
//     email: string;
//     role: string;
//     id: number;
// }
