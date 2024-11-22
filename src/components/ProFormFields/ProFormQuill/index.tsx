import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, Col } from 'antd';
import type { ProFormFieldProps } from '@ant-design/pro-components';
import type { ReactQuillProps } from 'react-quill';

const ProFormQuill = (props: ProFormFieldProps<any, ReactQuillProps>) => {
  const { colProps, initialValue, fieldProps, ...rest } = props;
  const [value, setValue] = useState(initialValue);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['image'],
    ],
  };
  return (
    <Col {...colProps}>
      <Form.Item {...rest}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          {...fieldProps}
        />
      </Form.Item>
    </Col>
  );
};

export default ProFormQuill;
