import React from 'react';
import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input } from 'reactstrap';

export default (props) => {
	return (
		<Card body className="message-form">
			<CardTitle>Welcome to GuestMap</CardTitle>
			<CardText>Leave a message with your location. Thanks for coming through!</CardText>
			{!props.sendingMessage && !props.sentMessage && props.haveUsersLocation ? (
				<Form onSubmit={props.formSubmitted}>
					<FormGroup row>
						<Label for="name">Name</Label>
						<Input
							onChange={props.handleChange}
							type="text"
							name="name"
							id="name"
							placeholder="enter a name"
						/>
					</FormGroup>
					<FormGroup row>
						<Label for="message">Message</Label>
						<Input
							onChange={props.handleChange}
							type="textarea"
							name="message"
							id="message"
							placeholder="enter a message"
						/>
					</FormGroup>
					<Button type="submit" color="info" disabled={() => props.formIsValid()}>
						Send
					</Button>{' '}
				</Form>
			) : props.sendingMessage || !props.haveUsersLocation ? (
				<video loop muted autoPlay src="https://media.giphy.com/media/xkC0zz2GObJfy/giphy.mp4" />
			) : (
				<CardText>Thanks for submitting your message!</CardText>
			)}
		</Card>
	);
};
