import Axios from "axios";

type ButtonRaw = { "file-name": string; value: string };

export class Client {
  public readonly baseUrl: string = "https://www.natorisana.love/api";

  /**
   *
   * @param postName 配信タイトル。`"てすと"` や `"台風くん-後生だから-天国へ-行こう-祈り"` など。
   * https://www.natorisana.love/api/v1/post-list.json を参照してほしいのだけれど、URI エンコ済みの文字列が返ってくるので、見づらいと思う。
   * @return key: ファイルの名前、 value: button.value
   */
  public async getButtons(postName?: string): Promise<Map<string, string>> {
    const buttonsFlat: Map<string, string> = new Map();

    const buttons: ButtonRaw[][][] =
      postName == null
        ? await this.getAllButtons()
        : await this.getPostButtons(postName);

    for (const buttonsOfPosts of buttons) {
      for (const buttonsArray of buttonsOfPosts) {
        for (const button of buttonsArray) {
          buttonsFlat.set(button["file-name"], button.value);
        }
      }
    }

    return buttonsFlat;
  }

  private async getAllButtons(): Promise<ButtonRaw[][][]> {
    return (await Axios.get<ButtonRaw[][][]>(this.baseUrl + "/v1/buttons.json"))
      .data;
  }

  private async getPostButtons(postName: string): Promise<ButtonRaw[][][]> {
    return [
      (await Axios.get<ButtonRaw[][]>(
        encodeURI(decodeURI(`${this.baseUrl}/button/${postName}.json`))
      )).data
    ];
  }
}
