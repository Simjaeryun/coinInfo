import React, { useState } from "react";
import { useForm } from "react-hook-form";
type IFormData = {
	errors: {
		email: {
			message: string;
		};
	};
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	checkPassword: string;
	extraError?: string;
};
function ToDoList() {
	// const [todo, setTodo] = useState("");
	// const onChange = (event: React.FormEvent<HTMLInputElement>) => {
	// 	const {
	// 		currentTarget: { value },
	// 	} = event;
	// 	setTodo(value);
	// };
	// const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	console.log(todo);
	// };

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<IFormData>({
		defaultValues: { email: "@naver.com" },
	});
	const onValid = (data: IFormData) => {
		if (data.password !== data.checkPassword) {
			return setError(
				"checkPassword",
				{ message: "비밀번호가 다릅니다." },
				// 오류났을때 보여질 메시지
				{ shouldFocus: true }
				// 오류가 난 input에 focus, 커서이동 시켜줌.
			);
		}
		// 서버가 꺼질때
		// setError("extraError", { message: "Server offline." });
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onValid)}>
				<input
					{...register("email", {
						required: { value: true, message: "필수 입력값입니다." },
						pattern: {
							value: /^[A-Za-z0-9._%+-]+@naver.com$/,
							message: "Only naver.com email allowed",
						},
					})}
					placeholder="Email"
				/>
				<span>{errors?.email?.message}</span>
				<input
					{...register("firstName", {
						required: true,
						validate: {
							noNico: (value) => (value.includes("nico") ? "no nico allowed" : true),
							noJr: (value) => (value.includes("jr") ? "no jr allowed" : true),
							// validate string을 넘기면 자동으로 error message처리
						},
					})}
					placeholder="First Name"
				/>
				<span>{errors?.firstName?.message}</span>
				<input {...register("lastName")} placeholder="Last Name" />
				<span>{errors?.lastName?.message}</span>
				<input
					{...register("password", {
						required: { value: true, message: "필수 입력값입니다." },
						minLength: { value: 3, message: "비밀번호가 너무 짧습니다." },
					})}
					placeholder="Password"
				/>
				<span>{errors?.password?.message}</span>
				<input
					{...register("checkPassword", { required: true })}
					placeholder="Re Enter Password"
				/>
				<span>{errors?.checkPassword?.message}</span>
				<button>Add</button>
			</form>
		</div>
	);
}

export default ToDoList;
