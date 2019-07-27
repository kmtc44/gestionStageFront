import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux"
import moment from 'moment';
import { Spin, Avatar, Comment, Tooltip, List } from "antd";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";

import Editor from '../Task/FormComment'


const baseSite = "http://localhost:8000";

function Rapport(props) {
	const [student, setStudent] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingUser, setLoadingUser] = useState(true);
	const [loadingStudent, setLoadingStudent] = useState(true);
	const [submitting, setSubmitting] = useState(false)
	const [comments, setComment] = useState([])
	const [commentValue, setCommentValue] = useState('')
	const [author, setAuthor] = useState('')
	const handleSubmit = () => {
		if (!commentValue) {
			return;
		}

		setSubmitting(true);

		const user = JSON.parse(localStorage.getItem("user"));
		axios.defaults.headers = {
			"Content-Type": "Application/json",
			Authorization: `Token ${user.token}`
		};
		let studentID
		if (props.match.params.rapportId) {
			studentID = props.match.params.rapportId
		} else {
			studentID = author.id
		}
		axios.post(`${baseSite}/rapport-comments/`, {
			comment: commentValue,
			student: studentID,
			author: author.user.id
		})
			.then(res => {
				setCommentValue('')
				setComment(
					[
						...comments,
						{
							author: author.first_name + author.last_name,
							avatar: author.image || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
							content: <p>{commentValue}</p>,
							datetime: moment().fromNow(),
						}
					],
				)
				setSubmitting(false)
			})
			.catch(err => console.log(err))
	};

	useEffect(() => {
		const fetchStudent = async () => {
			const user = JSON.parse(localStorage.getItem("user"));
			axios.defaults.headers = {
				"Content-Type": "Application/json",
				Authorization: `Token ${user.token}`
			};
			axios.get(`${baseSite}/${props.status}/${props.statusId}`)
				.then(re => {
					setAuthor(re.data)
					setLoadingUser(false)
				})
				.catch(err => console.log(err))
			if (props.match.params.rapportId) {
				const res = await axios(
					`${baseSite}/students/${props.match.params.rapportId}`
				);
				setStudent(res.data);
				console.log(res.data)
				setLoadingStudent(false);
			} else {
				setLoadingStudent(false);
			}
		};

		const fetchComment = async () => {
			const user = JSON.parse(localStorage.getItem("user"));
			axios.defaults.headers = {
				"Content-Type": "Application/json",
				Authorization: `Token ${user.token}`
			};
			let res = []
			if (props.match.params.rapportId) {
				res = await axios(
					`${baseSite}/rapport-comments/?studentId=${props.match.params.rapportId}`
				);
			} else {
				res = await axios(
					`${baseSite}/rapport-comments/?studentId=${props.statusId}`)
			}
			setComment(res.data.map(comment => {
				let author = ''
				let avatar = ''
				if (comment.author.student) {
					author = comment.author.student.first_name + " " + comment.author.student.last_name
					avatar = comment.author.student.image
				} else if (comment.author.framer) {
					author = comment.author.framer.first_name + " " + comment.author.framer.last_name
					avatar = comment.author.framer.image
				} else if (comment.author.teacher) {
					author = comment.author.teacher.first_name + " " + comment.author.teacher.last_name
					avatar = comment.author.teacher.image
				}

				return {
					// actions: [<span>Reply to</span>],
					author: author,
					avatar: avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
					content: (
						<p>
							{comment.comment}
						</p>
					),
					datetime: (
						<Tooltip
							title={moment()
								.subtract(1, 'days')
								.format('YYYY-MM-DD HH:mm:ss')}
						>
							<span>
								{moment(comment.commented_at).calendar()}
							</span>
						</Tooltip>
					),
				}
			}))
			console.log(res.data)
			setLoading(false);
		};

		fetchStudent();
		fetchComment()
	}, [props.match.params.rapportId, props.status, props.statusId,]);

	const handleChange = e => {
		setCommentValue(e.target.value)
	};

	return loading || loadingStudent || loadingUser ? (
		<Spin className="center container " />
	) : (
			<div className="container">
				{
					props.match.params.rapportId ? (
						<a href={student.attachments.rapport} className="btn btn-primary">Telecharger Rapport</a>
					) : (
							<a href={author.attachments.rapport} className="btn btn-primary">Telecharger Rapport</a>
						)
				}

				<hr />
				<Row>
					<Col md="6" className="mx-auto">
						<Card >
							<CardBody style={{ height: "500px", overflow: "auto" }}>
								<div>
									<List
										className="comment-list"
										header={`${comments.length} commentaires`}
										itemLayout="horizontal"
										dataSource={comments}
										renderItem={item => (
											<li>
												<Comment
													actions={item.actions}
													author={item.author}
													avatar={item.avatar}
													content={item.content}
													datetime={item.datetime}
												/>
											</li>
										)}
									/>
								</div>
								<hr />
							</CardBody>
							<CardFooter>
								<Comment
									avatar={
										<Avatar
											src={author.image || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
											alt="Han Solo"
										/>
									}
									content={
										<Editor
											onChange={handleChange}
											onSubmit={handleSubmit}
											submitting={submitting}
											value={commentValue}
										/>
									}
								/>
							</CardFooter>

						</Card>
					</Col>

				</Row>
			</div>
		)
}

const mapStateToProps = state => {
	return {
		status: state.status + 's',
		userId: state.userId,
		statusId: state.statusId
	}
}

export default connect(mapStateToProps)(Rapport)