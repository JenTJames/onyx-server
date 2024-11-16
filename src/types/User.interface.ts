export default interface User {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string | undefined;
  [x: string]: any;
}
