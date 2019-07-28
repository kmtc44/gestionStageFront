import React from "react";
import { connect } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { baseSite } from '../../config'

import {
	Form,
	Button,
	Upload,
	Icon
} from 'antd';

import {
	Card,
	CardBody,
	Row,
	Col
} from "reactstrap";

import axios from "axios";
class Attachments extends React.Component {
	state = {
		file: null,
		exist: null,
		fileList: [],
		fileCv: [],
		uploadingRapport: false,
		uploadingCv: false
	}

	constructor(props) {
		super(props);
		this.notify = this.notify.bind(this);
	}


	notify(place, message, type) {
		var options = {};
		options = {
			place: place,
			message: (
				<div>
					<div>{message}</div>
				</div>
			),
			type: type,
			icon: "now-ui-icons ui-1_bell-53",
			autoDismiss: 7
		};
		this.refs.notificationAlert.notificationAlert(options);
	}


	handleFormSubmit = (e) => {
		e.preventDefault();
		const { token } = this.props;
		axios.defaults.headers = {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`
		}

		const { fileList } = this.state;

		console.log(this.props.studentId)
		const fData = new FormData()

		this.setState({
			uploadingRapport: true,
		});

		fData.append("rapport", fileList[0])
		fData.append("student", this.props.studentId)
		axios.get(`${baseSite}/attachments/`)
			.then(res => {
				this.setState({ exist: res.data.filter(attachment => attachment.student === this.props.studentId)[0] })
				if (!this.state.exist) {
					axios.post(`${baseSite}/attachments/`, fData)
						.then(res1 => {
							this.setState({
								uploadingRapport: false,
							})
							// console.log(res1)
							this.notify(
								"tc",
								`Votre rapport est envoye avec succes`,
								"success"
							);
						}
						)
						.catch(err => console.log(err));
				} else {
					axios.put(`${baseSite}/attachments/${this.state.exist.id}/`, fData)
						.then(res1 => {
							this.setState({
								uploadingRapport: false,
							});
							console.log(res1)
						})
						.catch(err => console.log(err));
				}
			})
	}


	handleFormSubmitCv = (e) => {
		e.preventDefault();
		const { token } = this.props;
		axios.defaults.headers = {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`
		}

		const { fileCv } = this.state;

		console.log(this.props.studentId)
		const fData = new FormData()

		this.setState({
			uploadingCv: true,
		});

		fData.append("cv", fileCv[0])
		fData.append("student", this.props.studentId)
		axios.get(`${baseSite}/attachments/`)
			.then(res => {
				this.setState({ exist: res.data.filter(attachment => attachment.student === this.props.studentId)[0] })
				if (!this.state.exist) {
					axios.post(`${baseSite}/attachments/`, fData)
						.then(res1 => {
							this.setState({
								uploadingCv: false,
							})
							// console.log(res1)
							this.notify(
								"tc",
								`Votre CV  est envoye avec succes`,
								"success"
							);
						}
						)
						.catch(err => console.log(err));
				} else {
					axios.put(`${baseSite}/attachments/${this.state.exist.id}/`, fData)
						.then(res1 => {
							this.setState({
								uploadingCv: false,
							});
							console.log(res1)
						})
						.catch(err => console.log(err));
				}
			})
	}

	render() {

		const { uploadingRapport, uploadingCv, fileList, fileCv } = this.state;

		const props = {
			beforeUpload: file => {
				this.setState({
					fileList: [file]
				});
				console.log(file)
				return false;
			},
			fileList,

			beforeUploadCv: file => {
				this.setState({
					fileCv: [file]
				});
				return false;
			},
			fileCv,
		};


		return (
			<div className="container">
				<NotificationAlert ref="notificationAlert" />
				<Row>
					<Card>
						<CardBody>
							<Col md="12" className="mx-auto" >
								<div>
									<Form onSubmit={this.handleFormSubmit}>
										<Upload beforeUpload={props.beforeUpload} fileList={props.fileList}>
											<Button>
												<Icon type="upload" /> Joindre le rapport
						        		</Button>
										</Upload>
										<Button
											type="primary"
											htmlType="Submit"
											disabled={fileList.length === 0}
											loading={uploadingRapport}
											style={{ marginTop: 16 }}>
											{uploadingRapport ? 'Uploading' : 'Sauvegarder'}
										</Button>
									</Form>
								</div>
							</Col>

							<hr />

							<Col md="12" className="mx-auto" >
								<div>
									<Form onSubmit={this.handleFormSubmitCv}>
										<Upload beforeUpload={props.beforeUploadCv} fileList={props.fileCv}>
											<Button>
												<Icon type="upload" /> Joindre le C.V.
						          </Button>
										</Upload>
										<Button
											type="primary"
											htmlType="Submit"
											disabled={fileCv.length === 0}
											loading={uploadingCv}
											style={{ marginTop: 16 }}>
											{uploadingCv ? 'Uploading' : 'Sauvegarder'}
										</Button>
									</Form>
								</div>
							</Col>
						</CardBody>
					</Card>
				</Row>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		studentId: state.statusId,
		token: state.token
	}
}

export default connect(mapStateToProps)(Attachments);