import { Component } from "react";
import { Modal, Icon } from 'antd';
import React from 'react'
import {Upload} from 'antd'

class ImageUpload extends Component<{}> {
    state = {
        visible: true
    }
    hideModal = () => {
        this.setState({
            visible: false
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
    }

    render() {
        return <Modal 
        visible={this.state.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        >
            <Upload name="image">
                <Icon type="upload" />Click to upload
            </Upload>
        </Modal>
    }
}

export default ImageUpload