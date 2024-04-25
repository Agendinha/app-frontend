import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import swal from "sweetalert";
import { LoadingSpinner } from "@/components/ui/loading";

function RegisterForm() {
	const [isSubmitting, setSubmitting] = useState(false);

	const formik = useFormik({
		initialValues: {
			nomeCompleto: "",
			email: "",
			senha: "",
			confirmarSenha: "",
			telefone: "",
			userType: "Cliente", // Default value
		},
		validationSchema: Yup.object({
			nomeCompleto: Yup.string().required("Obrigatório"),
			email: Yup.string().email("Email inválido").required("Obrigatório"),
			senha: Yup.string()
				.min(8, "Mínimo de 8 caracteres")
				.required("Obrigatório"),
			confirmarSenha: Yup.string()
				.oneOf([Yup.ref("senha"), null], "Senhas não conicidem")
				.required("Obrigatório"),
			telefone: Yup.string()
				.matches(/^[0-9]+$/, "Apenas números são permitidos")
				.min(11, "Formato inválido")
				.max(11, "Formato inválido")
				.required("Obrigatório"),
			userType: Yup.string().required("Required"),
		}),
		onSubmit: async (values) => {
			setSubmitting(true);

			try {
				const response = await fetch(
					"https://api.agendinha.online/api/v1/register/",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: values.email,
							password: values.senha,
							name: values.nomeCompleto,
							phone: values.telefone,
							usertype: values.userType,
						}),
					}
				);

				if (response.ok) {
					swal("Sucesso", "Conta registrada com sucesso!", "success");

					formik.resetForm();
				} else {
					swal(
						"Ops!",
						"Algo deu errado, tente novamente mais tarde!",
						"error"
					);
				}
			} catch (error) {
				swal(
					"Ops!",
					`Algo deu errado, tente novamente mais tarde! - ${error}`,
					"error"
				);
			}

			setSubmitting(false);
		},
	});

	return (
		<form
			onSubmit={formik.handleSubmit}
			className="space-y-6 w-full md:w-3/4 lg:w-1/2 mx-auto"
		>
			<div>
				<Label
					htmlFor="nomeCompleto"
					className="block text-sm font-medium text-gray-700"
				>
					Nome Completo
				</Label>
				<Input
					id="nomeCompleto"
					name="nomeCompleto"
					type="text"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.nomeCompleto}
					className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"
				/>
				{formik.touched.nomeCompleto && formik.errors.nomeCompleto ? (
					<div className="text-red-500 text-xs italic">
						{formik.errors.nomeCompleto}
					</div>
				) : null}
			</div>
			<div>
				<Label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email
				</Label>
				<Input
					id="email"
					name="email"
					type="email"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
					className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"
				/>
				{formik.touched.email && formik.errors.email ? (
					<div className="text-red-500 text-xs italic">
						{formik.errors.email}
					</div>
				) : null}
			</div>
			<div>
				<Label
					htmlFor="senha"
					className="block text-sm font-medium text-gray-700"
				>
					Senha
				</Label>
				<Input
					id="senha"
					name="senha"
					type="password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.senha}
					className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"
				/>
				{formik.touched.senha && formik.errors.senha ? (
					<div className="text-red-500 text-xs italic">
						{formik.errors.senha}
					</div>
				) : null}
			</div>
			<div>
				<Label
					htmlFor="confirmarSenha"
					className="block text-sm font-medium text-gray-700"
				>
					Confirmar Senha
				</Label>
				<Input
					id="confirmarSenha"
					name="confirmarSenha"
					type="password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.confirmarSenha}
					className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"
				/>
				{formik.touched.confirmarSenha &&
				formik.errors.confirmarSenha ? (
					<div className="text-red-500 text-xs italic">
						{formik.errors.confirmarSenha}
					</div>
				) : null}
			</div>
			<div>
				<Label
					htmlFor="telefone"
					className="block text-sm font-medium text-gray-700"
				>
					Telefone
				</Label>
				<Input
					id="telefone"
					name="telefone"
					type="text"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.telefone}
					className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"
				/>
				{formik.touched.telefone && formik.errors.telefone ? (
					<div className="text-red-500 text-xs italic">
						{formik.errors.telefone}
					</div>
				) : null}
			</div>
			<div>
				<Label
					htmlFor="userType"
					className="block text-sm font-medium text-gray-700"
				>
					Tipo de conta
				</Label>
				<Select
					name="userType"
					id="userType"
					onValueChange={(value) =>
						formik.setFieldValue("userType", value)
					}
					defaultValue={formik.values.userType}
				>
					<SelectTrigger aria-label="User type">
						<SelectValue placeholder="Select user type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Cliente" className="text-black">
							Cliente
						</SelectItem>
						<SelectItem value="Parceiro" className="text-black">
							Parceiro
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<Button
				type="submit"
				disabled={isSubmitting || !formik.isValid}
				className="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#E67D3C] hover:bg-[#cf6f35] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E67D3C]"
			>
				{isSubmitting ? (
					<LoadingSpinner /> 
				) : (
					"Criar conta"
				)}
			</Button>
		</form>
	);
}

export default RegisterForm;
