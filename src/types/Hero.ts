export default interface Hero {
  id: number;
  name: string;
  powerstats: string;
  biography: {
    fullName: string,
    firstAppearance: string,
  };
}
