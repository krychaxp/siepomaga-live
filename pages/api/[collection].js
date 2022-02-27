import axios from "axios";

const func = async (req, res) => {
  const { collection } = req.query;
  try {
    const { data } = await axios.get(
      `https://www.siepomaga.pl/${collection}?donations_latest=true&tabs=true`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    if (data.html) {
      const { items } = data.html;
      const results = items
        .join("")
        .replace(/\n/g, "")
        .replace(/\s{2,}/g, "");
      const dates = results
        .match(/data-time="([^"]*)"/g)
        .map((v) => v.replace('data-time="', "").replace('"', ""));
      const amounts = results
        .match(
          /data-common-formatted-number-component-raw-value-value="([^"]*)"/g
        )
        .map((v) =>
          v
            .replace(
              'data-common-formatted-number-component-raw-value-value="',
              ""
            )
            .replace('"', "")
        );
      const persons = results
        .match(/<span class="donation-card-component__name">([^<]*)<\/span>/g)
        .map((v) =>
          v
            .replace('<span class="donation-card-component__name">', "")
            .replace("</span>", "")
        );

      const result = dates.map((date, i) => ({
        id: Math.round(Math.random()*Date.now()),
        paid_at: date,
        amount: amounts[i],
        signature: persons[i],
      }));
      return res.status(200).json({ payments: result });
    } else {
      return res.status(200).json(data);
    }
  } catch (err) {
    res.status(404).json({ error: "Collection not found" });
  }
};

export default func;
