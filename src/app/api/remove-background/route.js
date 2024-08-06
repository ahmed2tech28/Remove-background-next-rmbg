import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import removeBackground from "@imgly/background-removal-node";

function generateDailyChangingNumber() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Get the number of milliseconds since the start of the day
  const millisecondsSinceStartOfDay = now - startOfDay;

  // Optionally, apply a modulo operation to keep the number within a certain range
  // For example, to keep it within the range 0-9999
  const uniqueNumber = millisecondsSinceStartOfDay % 10000;

  return uniqueNumber;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.getAll("file")[0];

    if (!file) {
      // If no file is received, return a JSON response with an error and a 400 status code
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file format. Only PNG, JPEG, and JPG are supported.",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dailyChangingNumber = generateDailyChangingNumber();

    const filename = file.name.replaceAll(" ", "_");
    const filePath = path.join(
      process.cwd(),
      "public/" +
        `${dailyChangingNumber}.${
          filename.split(".")[filename.split(".").length - 1]
        }`
    );

    await writeFile(filePath, buffer);

    const blob = await removeBackground(filePath);
    const buffer2 = Buffer.from(await blob.arrayBuffer());
    const dataURL = `data:image/png;base64,${buffer2.toString("base64")}`;
    const timestamp = Date.now();
    const outputFileName = path.join(
      process.cwd(),
      "public/" + `output_${dailyChangingNumber}.png`
    );

    await writeFile(outputFileName, dataURL.split(";base64,").pop(), {
      encoding: "base64",
    });

    // console.log(file);
    return NextResponse.json({ Message: "Success", status: 201, dataURL });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
