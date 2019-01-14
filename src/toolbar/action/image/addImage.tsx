import { Component } from "react";
import { Modal, Icon, message } from 'antd';
import React from 'react'
import {Upload} from 'antd'

export interface ImageProps {
    createImageBlock: (options: any)=>any,
    action?: string,
    replaceUrls?: (fileList: any, response: any) => any
}
export interface ImageState {
    visible: boolean,
    fileList: any []
}

export default class ImageUpload extends Component<ImageProps> {
    state:ImageState = {
        visible: true,
        fileList: []
    }
    hideModal = () => {
        this.setState({
            visible: false,
        })
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleCancel = () => {
        this.hideModal()
    }
    handleOk=() => {
        this.uploadImages().then((response:any) => {
            console.log(response)
            if(this.props.replaceUrls) {
                const fileList = this.state.fileList
                this.setState({
                    fileList: this.props.replaceUrls(fileList, response)
                })
            }
            this.props.createImageBlock(this.state.fileList)
            this.hideModal()
            this.setState({
                fileList: []
            })
           
        })
    }

    uploadImages = ():any => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
          formData.append('files[]', file);
        });

        return fetch(
            this.props.action || '//jsonplaceholder.typicode.com/posts/',
            {
                method: 'post',
                body: formData
            }
        ).then(
            (response) => {
                if(response.ok) {
                    return response.json()
                } else {
                    message.error(response.statusText)
                    return Promise.reject()
                }
            }
        )
    }

    render() {
        const onRemove = (file:any):void => {
            const {fileList} = this.state
            const newFileList = fileList.filter(item => item !== file)
            this.setState({
                fileList: newFileList
            })
        }
        const beforeUpload = (file: any): boolean => {
            const reader: FileReader = new FileReader()
            reader.onload = (e:any) => {
                console.log(e)
                // 手动设置thumburl
                file.thumbUrl = e.target.result
                this.setState({
                    fileList: [...this.state.fileList, file]
                })
            }
            reader.readAsDataURL(file)
            
            return false
        }
        const onChange = (file: any): any => {
            console.log(file)
        }
        return <Modal 
        visible={this.state.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        bodyStyle={{paddingTop: '60px'}}
        >
            <Upload.Dragger
             name="image"
             listType="picture"
             onRemove={onRemove}
             onChange={onChange}
             beforeUpload={beforeUpload}
             fileList={this.state.fileList}
             >
                <Icon type="upload" />Add Source
            </Upload.Dragger>
        </Modal>
    }
}
