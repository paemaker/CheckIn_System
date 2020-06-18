import '../ex_css.css';

import { Button, Col, Drawer, Form, Input, Row, Select, Space, Upload } from 'antd';
import React, { Component } from 'react';

import {UploadOutlined} from '@ant-design/icons';
import axios from 'axios';

const Token = localStorage.getItem('lgtoken');

const { Option } = Select;
export default class AddPersonnel extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            submitButt: true,
        }
        this.ToggleButton = this.ToggleButton.bind(this)
    }   
    ToggleButton = elelment =>
    {
        const {name ,value} = elelment.target
        console.log('value of', name, 'is', value)
        if(name !== null && value !== null)
        {
            this.setState
        ({
            submitButt: false
        })
    }
    }
    
    render()
    {
        const validateMessages = 
        {
            required: '${label} is required!',
            types: 
            {
                email: '${label} is not validate email!'   
            }
        };

        const props = 
        {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            listType: 'picture',
        };

        const onFinish = values => {
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('firstname', values.firstname);
            formData.append('lastname', values.lastname);
            formData.append('nickname', values.nickname);
            formData.append('email', values.email);
            formData.append('position', values.position);
            formData.append('photo', values.photo.file);
            console.log(values);
            axios.post('http://139.180.147.221:8101/admin/addmember', 
           formData
            
            , {headers: {'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6eyJ1c2VybmFtZSI6ImFkbWluIn0sInJvbGUiOiJBZG1pbiIsImlhdCI6MTU5MjQ3OTgyN30.bDD0VdWsBWMoaKwjCIUADVBj4nQmb80ElAeiiB5juyE', 'Content-Type': 'multipart/form-data'}})
        .then(res => {
            console.log('add member>>>>',res)
            // if(res.data.message === 'add member sucessfull')
            // {
            //     notification.success({
            //         duration: 0,
            //         message: 'Done!',
            //         description: <Text>Added member successfully. <br/> Password : "{res.data.password}"</Text>
            //     }) 
            //     setTimeout(() => {
            //        window.location=('/Homefront') 
            //     }, 6000);                
            // }
        })
        .catch(e => {
            console.log('Error =', e)
        })
        };
          
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        console.log('Success:', Token);


        return(
            <>                
                
                <Drawer title={<h2 style={{margin: '10px 0px 0px 35%'}}>Add member</h2>} visible={this.props.openMember}
                width={500} onClose={this.props.closeMember}
                >
                    <Form validateMessages={validateMessages} layout="vertical" onSubmitCapture={this.props.addSubmit} onFinishFailed={onFinishFailed} onFinish={onFinish}>
                        <Form.Item name="username" label="Username" rules={[{ required: true }]} >
                            <Input name="username" placeholder="zizou05" allowClear onChange={this.props.addInput}/>
                        </Form.Item>
                        
                        <Row>
                            <Col span={12}>
                                <Form.Item name="firstname" label="Firstname" rules={[{ required: true }]} 
                                style={{width: '220px'}}
                                >
                                    <Input name="firstname" placeholder="David" allowClear onChange={this.props.addInput}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="lastname" label="Lastname" rules={[{ required: true }]} >
                                    <Input name="lastname" placeholder="O'brien" allowClear onChange={this.props.addInput}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        <Form.Item name="nickname" label="Nickname" rules={[{ required: true }]}>
                            <Input name="nickname" placeholder="Dave" allowClear onChange={this.props.addInput}/>
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                            <Input name="email" placeholder="zz98@gmail.com" allowClear onChange={this.props.addInput}/>
                        </Form.Item>
                        
                        <Form.Item name="position" label="Position" >
                            <Select
                                name="position"
                                showSearch
                                style={{ width: 450 }}
                                placeholder="Select a standing"
                                optionFilterProp="children"
                                onChange={this.props.addSelect}
                                allowClear
                            >
                                <Option value="C level (CEO)">C-Level (CEO)</Option>
                                <Option value="C-Level Corporate">C-Level Corporate</Option>
                                <Option value="Graphic Design">Graphic Design</Option>
                                <Option value="Software Quality Assurance">Software Quality Assurance</Option>
                                <Option value="Mobile Developer">Mobile Developer</Option>
                                <Option value="Frontend Developer">Frontend Developer</Option>
                                <Option value="Manager">Manager</Option>
                                <Option value="Admin">Admin</Option>
                                <Option value="Marketing">Marketing</Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item name="photo" label="Photo" >
                            <Upload {...props} name="photo" beforeUpload={() => false} on={this.props.addUpload} >
                                <Button style={{width: 450}} >
                                    <UploadOutlined /> Upload
                                </Button>
                            </Upload>
                        </Form.Item>

                        <br />
                        <br />
                        <Form.Item style={{float: 'right'}}>
                            <Space>
                                <Button onClick={this.props.closeMember} danger>Cancel</Button>
                                <Button htmlType="submit" type="primary" style={{ marginRight: 8 }}>Submit</Button>
                            </Space>
                        </Form.Item>
                    </Form>         
                </Drawer>

            </>
        );
    }
}