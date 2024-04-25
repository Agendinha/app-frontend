import { Checkbox } from "@/components/ui/checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";

function LoginForm() {
	const formik = useFormik({
		initialValues: {
			password: "",
			email: "",
			keepLogged: false,
		},

		validationSchema: Yup.object({
			password: Yup.string()
				.min(8, "Senha precisa ter no mínimo 8 caracteres")
				.required("Required"),
			email: Yup.string().email("Email invalido").required("Required"),
		}),

		onSubmit: async (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<label htmlFor="email">Email Address</label>
			<input id="email" type="email" {...formik.getFieldProps("email")} />
			{formik.touched.email && formik.errors.email ? (
				<div>{formik.errors.email}</div>
			) : null}

			<label htmlFor="password">Password</label>
			<input
				id="password"
				type="password"
				{...formik.getFieldProps("password")}
			/>
			{formik.touched.password && formik.errors.password ? (
				<div>{formik.errors.password}</div>
			) : null}

      <Checkbox {...formik.getFieldProps("keepLogged")} id="keepLogged"/>
      <label htmlFor="keepLogged">Manter login</label>

			<button type="submit">Submit</button>
		</form>
	);
}

export default LoginForm;
