import getData from '../../../../dataModel/index.js';

// console.log(getData());

// get data then json.parse

export default async function selectData() {
  // console.log('startSelectData');
  const tempData = await getData();
  // console.log(tempData);

  return JSON.parse(tempData).cases.map(
    (el) =>
      new Object({
        title: el.title,
        date: new Date(Date.parse(el.date)).toLocaleDateString('ru', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        img: el.img,
        type: el.type,
        id: el.id,
      })
  );
}

// const tempData = getData();

// console.log(data);
// export default data;
