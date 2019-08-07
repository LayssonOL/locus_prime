import { Observable, Observer } from "rxjs";

const baseURL = "http://localhost:3000";

export const getProducts = async (user_id: string) => {
        try {
         return await fetch(`${baseURL}/productsList/${user_id}`, {
          method: "get",
          headers: { "Content-Type": "application/json" }
        }).then((res: any) => {
            return res.json();
        });
      } catch (err) {
        return err;
      }
  };
