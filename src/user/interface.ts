import { Award } from "../awards/interface";

export interface Player {
  name: string;
  score: number;
  awards: Award[];
  password?: string;
}
