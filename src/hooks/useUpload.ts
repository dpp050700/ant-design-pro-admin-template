import { Method, S3ServiceApi } from '../apifox';
import { useRequest } from 'ahooks';

const useUpload = () => {
  const s3Service = new S3ServiceApi();
  const { runAsync: signUrl } = useRequest(
    (name: string) =>
      s3Service.s3ServiceTemporarySignUrl({
        body: {
          method: Method.Post,
          key: name,
        },
      }),
    {
      manual: true,
    },
  );

  const { runAsync } = useRequest(
    (url, file) => {
      return fetch(url!, {
        method: 'put',
        body: file,
      });
    },
    { manual: true },
  );

  const upload = async (file: File) => {
    const res = await signUrl(file.name);
    const uploadRes = await runAsync(res.url, file);
    if (uploadRes.status === 200) {
      return res;
    }
    return Promise.reject('上传失败');
  };

  return {
    upload,
  };
};

export default useUpload;
