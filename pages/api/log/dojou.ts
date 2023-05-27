import prisma from "@/lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";

type DojouPostData = {
  dojouId: string;
  value: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const dataList = await prisma.dojouData.findMany();
      res.status(200).json(dataList);
      return;
    case "POST":
      const data: DojouPostData = req.body;
      const createRes = await prisma.dojouData.create({ data: { ...data } });
      res.status(201).json({ status: "created" });
      return;
  }
  res.status(400).json({ error: "bad request" });
}
