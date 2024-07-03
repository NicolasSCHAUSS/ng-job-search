import { JobItem } from './job-item.model';

export interface JobDetails extends JobItem {
  location: string;
  industries: string[];
  types: string[];
  description: string;
  publishDate: string;
}