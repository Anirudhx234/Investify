/* client data: this interface only represents
 * info that is expected to be available on the frontend
 */
import { InvestmentRisk } from "../enums/InvestmentRisk";
interface AppClient {
  id: string;
  email: string;
  username: string;
  profilePicture?: string | undefined;
  age?: number | undefined | null;
  income?: number | undefined | null;
  shortTermGoal?: string;
  longTermGoal?: string;
  investmentRisk?: InvestmentRisk;
  userSavings?:number | undefined | null;
  currentSavings?:number | undefined | null;
}

export default AppClient;
