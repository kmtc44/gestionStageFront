import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col } from "reactstrap";
import moment from 'moment';
import { connect } from 'react-redux';
import axios from "axios";
export var CharStarting;

const baseSite = "http://localhost:8000";
function Chat(props) {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState(null);
	const msgEnd = useRef(null)

	const onMessage = (e) => {
		setMessage(e.target.value)

	}

	const fetchMessage = async () => {
		axios.defaults.headers = {
			'Content-Type': "Application/json",
			Authorization: `Token ${props.token}`
		}
		const res = await axios.get(`${baseSite}/conv-messages/?convID=${props.convID}`)

		setMessages(res.data)
	}

	const scrollToBottom = () => {
		msgEnd.current.scrollIntoView({ behavior: "smooth" });
	}


	const onNewMessage = (e) => {
		e.preventDefault()
		if (!message) {
			return
		}
		axios.defaults.headers = {
			'Content-Type': "Application/json",
			Authorization: `Token ${props.token}`
		}
		axios.post(`${baseSite}/conv-messages/`, {
			content: message,
			sender: props.userId,
			convention: props.convID,
			sender_status: props.status
		})
			.then(res => {
				console.log(res.data)
				setMessage('')
				fetchMessage()
			})
			.catch(err => console.log(err))

	}


	useEffect(() => {
		const fetchMessages = async () => {
			axios.defaults.headers = {
				'Content-Type': "Application/json",
				Authorization: `Token ${props.token}`
			}
			const res = await axios.get(`${baseSite}/conv-messages/?convID=${props.convID}`)

			setMessages(res.data)
		}
		scrollToBottom()
		CharStarting = setInterval(fetchMessages, 2000);
		fetchMessages();
	}, [props.convID, props.token])
	return messages ? (
		<div className="content mx-auto mt-5">
			<h3 className="text-center">Discussion <i className={"now-ui-icons icon-check-2"} /></h3>
			<Row>
				<Col md="9" className="mx-auto">
					<Card>
						<div className="messaging" >
							<div className="inbox_msg ">
								<div className="mesgs">
									<div className="msg_history">
										{
											messages.map(message => {
												return (
													<div key={message.id}>
														{message.sender_status !== props.status ? (
															<div className="incoming_msg">

																{
																	message.sender_status === 'teacher' ? (
																		<div className="incoming_msg_img">
																			{
																				message.sender.teacher.image ? (
																					<img style={{ borderRadius: "100%" }} src={message.sender.teacher.image} alt="sunil" />
																				) : (
																						<img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
																					)
																			}
																		</div>
																	) : (
																			<div className="incoming_msg_img">
																				{
																					message.sender.framer.image ? (
																						<img style={{ borderRadius: "100%" }} src={message.sender.framer.image} alt="sunil" />

																					) : (
																							<img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
																						)
																				}
																			</div>
																		)
																}


																<div className="received_msg">
																	<div className="received_withd_msg">
																		<p>{message.content}</p>
																		<span className="time_date"> {moment(message.sended_at).calendar()}</span></div>
																</div>
															</div>
														) : (<div className="outgoing_msg">
															<div className="sent_msg">
																<p>{message.content}</p>
																<span className="time_date"> {moment(message.sended_at).calendar()}</span> </div>
														</div>)
														}
													</div>
												)
											})
										}
									</div>
									<div className="type_msg">
										<form onSubmit={onNewMessage} >
											<div className="input_msg_write" >
												<input type="text" className="write_msg" placeholder="Ecrire Votre message" onChange={onMessage} value={message} />
												<button className="msg_send_btn" type="submit">  </button>
											</div>
										</form>
										<div ref={msgEnd} />
									</div>
								</div>
							</div>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	) : ("")
}

const mapStateToProps = state => {
	return {
		token: state.token,
		status: state.status,
		userId: state.userId
	}
}
export default connect(mapStateToProps)(Chat) 