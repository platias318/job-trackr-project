declare global {
  //This is used because passport.ts serialize method uses the "user" var but without having the id type inside which I need, so I extend the interface of Express.User
  namespace Express {
    interface User {
      id: number;
      email: string;
      name: string;
      google_id: string;
    }
  }
}

export {};
