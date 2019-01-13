import { Component } from "react";
import { Modal, Icon } from 'antd';
import React from 'react'
import {Upload} from 'antd'

class ImageUpload extends Component<{createImageBlock: (options: any)=>void}> {
    state = {
        visible: true,
        thumbUrl: ''
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
        this.hideModal()
        if(this.props.createImageBlock) {
            this.props.createImageBlock({
            src: this.state.thumbUrl
        })}
    }

    onFileChange = (data: any) => {
        const {thumbUrl} = data.file
        console.log(data, thumbUrl)
        this.setState({
            thumbUrl
        })
    }

    customRequest = (data: any) => {
        console.log(data)
    }

    render() {
        return <Modal 
        visible={this.state.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        >
            <Upload.Dragger
             name="image"
             listType="picture"
             onChange={this.onFileChange}
             customRequest={this.customRequest}
             >
                <Icon type="upload" />Click to upload
            </Upload.Dragger
            >
        </Modal>
    }
}

export default ImageUpload