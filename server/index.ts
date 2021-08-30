import express, { Application, Request, Response } from "express";

const app: Application = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
