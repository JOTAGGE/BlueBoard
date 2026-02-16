import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Usuário criado com sucesso!");
      navigate("/"); // ← volta pro login
    } catch (error: unknown) {
      console.error(error);
      alert("Erro ao registrar");
    }
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1>Criar Conta</h1>

        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={inputStyle}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={inputStyle}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={buttonStyle} type="submit">
            Cadastrar
          </button>
        </form>

        <p style={{ marginTop: 20 }}>
          Já tem conta? <Link to="/">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f3f4f6",
};

const cardStyle: React.CSSProperties = {
  background: "white",
  padding: 40,
  borderRadius: 8,
  width: 350,
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  marginBottom: 15,
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  cursor: "pointer",
};
