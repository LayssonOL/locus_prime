import { Observable, Observer } from "rxjs";

const baseURL = "http://localhost:3000";

export const login = async (email: string, password: string) => {
      try {
        return await fetch(`${baseURL}/auth`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }).then((res: any) => {
            return res.json();
        });
        
      } catch (err) {
        return err;
      }
  };
