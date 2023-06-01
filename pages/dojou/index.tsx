import { Container, Dropdown } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import prisma from "@/lib/prismadb";
import { DojouData } from "@prisma/client";
import { useEffect, useState } from "react";
type Props = {
  dojouDatas?: DojouData[];
};
const DojouIndexPage = ({ dojouDatas }: Props) => {
  const [selectedDojouDatas, setSelectedDojouDatas] = useState<
    DojouData[] | undefined
  >(dojouDatas);
  const [startAt, setStartAt] = useState<Date | undefined>(undefined);
  const [endAt, setEndAt] = useState<Date | undefined>(undefined);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  const [data, setData] = useState({
    labels: dojouDatas?.map((d) => new Date(d.createdAt).toLocaleString()),
    datasets: [
      {
        label: "土壌水分量(%)",
        data: dojouDatas?.map((d) => d.value),
        borderColor: "rgb(53, 162, 235)",
      },
    ],
  });
  useEffect(() => {
    setData({
      labels: selectedDojouDatas?.map((d) =>
        new Date(d.createdAt).toLocaleString()
      ),
      datasets: [
        {
          label: "土壌水分量(%)",
          data: selectedDojouDatas?.map((d) => d.value),
          borderColor: "rgb(53, 162, 235)",
        },
      ],
    });
  }, [selectedDojouDatas]);
  const onSelectDropdown = (w: "startAt" | "endAt", d: Date) => {
    if (w === "startAt") setStartAt(d);
    if (w === "endAt") setEndAt(d);
    if (startAt && endAt) {
      const selected = dojouDatas?.filter((d) => {
        const createdAt = new Date(d.createdAt);
        return createdAt >= startAt && createdAt <= endAt;
      });
      setSelectedDojouDatas(selected);
    }
  };
  if (!selectedDojouDatas) return <div>loading...</div>;
  return (
    <Container>
      <h1>土壌情報データベース</h1>
      <div className="d-flex">
        <Dropdown
          onSelect={(e) => {
            console.log(e);
          }}
          className="m-2"
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {startAt ? startAt.toLocaleString() : "StartAt"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {dojouDatas?.map((d) => (
              <Dropdown.Item
                key={d.id}
                onClick={() => {
                  onSelectDropdown("startAt", new Date(d.createdAt));
                }}
              >
                {new Date(d.createdAt).toLocaleString()}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          onSelect={(e) => {
            console.log(e);
          }}
          className="m-2"
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {endAt ? endAt.toLocaleString() : "EndAt"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {dojouDatas?.map((d) => (
              <Dropdown.Item
                key={d.id}
                onClick={() => {
                  onSelectDropdown("endAt", new Date(d.createdAt));
                }}
              >
                {new Date(d.createdAt).toLocaleString()}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Line data={data} options={options} />
    </Container>
  );
};

export default DojouIndexPage;

export const getServerSideProps = async () => {
  const dataList = await prisma.dojouData.findMany();
  return {
    props: {
      dojouDatas: dataList.map((d) => ({
        ...d,
        createdAt: d.createdAt.toString(),
        updatedAt: d.updatedAt.toString(),
      })),
    },
  };
};
