import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import { connect } from 'react-redux';
import { Spin, Avatar, Comment, Tooltip, List } from "antd";
import { Card, CardTitle, CardSubtitle, CardBody, CardFooter } from "reactstrap";
import { baseSite } from '../../config'
import Editor from '../Task/FormComment'

function Task(props) {
	const [task, setTask] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingUser, setLoadingUser] = useState(false);
	const [students, setStudents] = useState([]);
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
		axios.post(`${baseSite}/task-comments/`, {
			comment: commentValue,
			task: props.taskId,
			author: author.user.id
		})
			.then(res => {
				setCommentValue('')
				setComment(
					[
						...comments,
						{
							author: author.first_name + author.last_name,
							avatar: author.image ||'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
							content: <p>{commentValue}</p>,
							datetime: moment().fromNow(),
						}

					],
				)
				setSubmitting(false)
			})
			.catch(err => console.log(err))
	};

	const handleChange = e => {
		setCommentValue(e.target.value)
	};

	useEffect(() => {
		const fetchTask = async () => {
			setLoading(true);
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
			if (props.taskId) {
				const res = await axios(
					`${baseSite}/task/${props.taskId}`
				);

				setTask(res.data);
				setComment(res.data.comments.map(comment => {
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
				setStudents(res.data.students)
				console.log(res.data)
				setLoading(false);
			}
		};

		fetchTask();
	}, [props.taskId, props.status, props.statusId, props.visible]);

	return loading || loadingUser ? (
		<Spin className="center container " />
	) : (
			<div className="content">
				<Card body>
					<CardTitle
						className="text-center"
						style={{
							fontSize: 20,
							fontWeight: "bold",
							height: 50
						}}
					>
						<span>Nom de la tache: {task.title} </span>
					</CardTitle>
					<CardSubtitle>
						<span>description de la tache: {task.description} </span> <br />
						<span>
							{students.map(student => {
								return (
									<span key={student.id}>
										{
											student.image ? (
												<span>
													<Avatar src={student.image} /> {student.first_name} {student.last_name} <br />
												</span>
											) : (
													<span>
														<Avatar src={require("../../assets/img/student.png")} /> {student.first_name} {student.last_name} <br />
													</span>
												)
										}
									</span>
								)
							})}
						</span>
						<hr />

					</CardSubtitle>
					<CardBody>
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
			</div>
		)
}

const mapStateToProps = state => {
	return {
		status: state.status + 's',
		userType: state.status,
		statusId: state.statusId
	}
}
export default connect(mapStateToProps)(Task) 