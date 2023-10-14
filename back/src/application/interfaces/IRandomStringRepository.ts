export const IRandomStringRepositoryKey = "IRandomStringRepository";

export interface IRandomStringRepository{
    get():Promise<string>;
}