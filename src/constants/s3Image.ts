import { API_BASE_URL } from '../libs/constants';

export const S3ImageUrl = (key: string) => {
  return `${API_BASE_URL}/s3/object/${key}`;
};

export const PutS3ImageUrl = () => {
  return `${API_BASE_URL}/s3/object`;
};
