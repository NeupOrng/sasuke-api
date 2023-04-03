
export interface IHashService {
  Hash: (password: string ) => Promise<string>,
  Compare: (password: string, hash: string) => Promise<boolean>
}