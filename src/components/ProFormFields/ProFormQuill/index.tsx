/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ProForm } from '@ant-design/pro-components';
import { Form, Col } from 'antd';

const ProFormQuill = (props: any) => {
  const [value, setValue] = useState('');
  return (
    <Col {...props.colProps}>
      <Form.Item {...props}>
        <ReactQuill theme="snow" value={value} onChange={setValue} />;
      </Form.Item>
    </Col>
  );
};

export default ProFormQuill;
