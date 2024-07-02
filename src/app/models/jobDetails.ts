import { JobItem } from "./jobItem";

export class JobDetails extends JobItem {

  constructor(
    id: number,
    companyName: string,
    title: string,
    companyLogo: string,
    reference: string,
    public location: string,
    public industries: string[],
    public types: string[],
    public description: string,
    public publishDate: string
  ){
    super(id, companyName, title, companyLogo, reference);
  };
}