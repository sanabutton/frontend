import { Client } from "./Client";

test("getButtons を引数無しで呼び出したら、全ボタンが取れる", async () => {
  const client = new Client();
  const buttons = await client.getButtons();

  // 1回目の配信のボタンが含まれて、
  expect(buttons.has("てすと/ありがとナス！")).toBe(true);
  expect(buttons.get("てすと/ありがとナス！")).toBe("ありがとなす！");
  // 2回目の配信のボタンも含まれる。
  expect(buttons.has("せんせえとないしょばなし/ぜろぜろぜろ")).toBe(true);
  expect(buttons.get("せんせえとないしょばなし/ぜろぜろぜろ")).toBe(
    "ぜろぜろぜろ"
  );
});

test("getButtons を引数付きで呼び出した場合", async () => {
  const client = new Client();
  const buttons = await client.getButtons("てすと");

  expect(buttons.has("てすと/ありがとナス！")).toBe(true);
  expect(buttons.get("てすと/ありがとナス！")).toBe("ありがとなす！");

  expect(buttons.has("せんせえとないしょばなし/ぜろぜろぜろ")).toBe(false);
});

test("getButtons の引数に URL エンコード済みの文字列を渡しても大丈夫", async () => {
  const client = new Client();
  const buttons = await client.getButtons("%E3%81%A6%E3%81%99%E3%81%A8");

  expect(buttons.has("てすと/ありがとナス！")).toBe(true);
  expect(buttons.get("てすと/ありがとナス！")).toBe("ありがとなす！");

  expect(buttons.has("せんせえとないしょばなし/ぜろぜろぜろ")).toBe(false);
});
