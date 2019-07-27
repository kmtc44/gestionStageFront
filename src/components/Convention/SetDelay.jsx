import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom"
import { Form, Button, InputNumber } from "antd";



const baseSite = "http://localhost:8000";
class DurationForm extends React.Component {

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
				axios.defaults.headers = {
					"Content-Type": "Application/json",
					Authorization: `Token ${this.props.token}`
				};
				axios
					.put(`${baseSite}/internship/convention/${this.props.conventionId}/`, {
						life_time: values.life_time
					})
					.then(res => {
						console.log(res);
						this.props.history.push(`/dashboard`)
						this.props.history.push(`/dashboard/convention/detail/${this.props.conventionId}`)
					})
					.catch(err => console.log(err));
			}
		});
	};

	render() {

		const { getFieldDecorator } = this.props.form;
		return (
			<Form
				className="mr-10 p-5 text-center"
				onSubmit={this.handleSubmit}
			>
				<Form.Item label="Nombre d'annees">
					{getFieldDecorator("life_time", { initialValue: 0 })(
						<InputNumber min={0} max={10} />
					)}
					<span className="ant-form-text"> Annees</span>
				</Form.Item>

				<Form.Item >
					<Button type="primary" htmlType="submit">
						Confirmer
          </Button>
				</Form.Item>
			</Form>
		)
	}
}

const WrappedDurationForm = Form.create({ name: "duration" })(
	DurationForm
);

export default withRouter(WrappedDurationForm);