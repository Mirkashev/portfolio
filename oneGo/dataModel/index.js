// запрос
// запись в localStorage
// обновлять раз в 12 часов(т.е запрос на сервер пройдёт только через 12 часов)

export default async function getData() {
  const url =
    'https://script.google.com/macros/s/AKfycbz30Dz7jk-vh6dgLAicrW-qGB5JYmHFWXELLK2aRpUu3RSUtsFWav0t02_SdAd61zRCpw/exec';
  // console.log('start getData');

  if (
    localStorage.getItem('landData') &&
    (new Date() - Date.parse(JSON.parse(localStorage.getItem('date')))) /
      1000 /
      60 <
      5
  ) {
    // console.log(localStorage.getItem('date'));
    // console.log('if');
    return localStorage.getItem('landData');
  } else {
    return await fetch(url)
      .then((res) => {
        console.log(res);
        // for (const value of res.headers.values()) {
        //   console.log(value);
        // }
        return res.json();
      })
      .then((data) => {
        const landObject = JSON.stringify({
          cases: data.map((el, index) => {
            return {
              id: index,
              title: el[0],
              // список тегов, заполнять с маленькой буквы
              type: el[1]
                .replace(/\s/g, '')
                .split(',')
                .map((el) => el.toLowerCase()),
              // дата начала проекта или окончания, я так и не понял
              date: el[2],
              // картинка проекта
              img: el[4],

              task: el[5],
              invest: el[6],
              devTime: el[3],
              technologies: el[7],
              // картинка технологий для пк
              technologiesImg: el[8],
              // картинка технологий для мобилки (такой же принцип у подходов - approaches)
              technologiesImgMobile: el[9],
              approaches: el[10],
              approachesImg: el[11],
              comment: el[12],
              commentImg: el[14],
              commentName: el[13],
            };
          }),
          comments: data.map(
            (el) =>
              new Object({
                text: el[12],
                name: el[13],
                url: el[14],
              })
          ),
        });
        localStorage.setItem('landData', landObject);
        localStorage.setItem('date', JSON.stringify(new Date()));

        console.log(data);
        return landObject;
      });
  }
}

// const commonData = {
//   cases: [
//     {
//       title: 'Wins',
//       // дата начала проекта или окончания, я так и не понял
//       date: '5 января 2022',
//       // картинка проекта
//       img: 'https://raw.githubusercontent.com/oneGo-inc/LandingPageImage/main/wins/Preview%20wins.jpg',
//       // список тегов, заполнять с маленькой буквы
//       type: ['native'],
//       task: 'Создать площадку для развития экстремальных видов спорта и объединение скейтеров со всего мира.',
//       invest:
//         'Разработали нейронную сеть, которая определяет тип трюка. Данная технология была отмечена на контенте от selectel призовым местом',
//       devTime: '3 месяца',
//       technologies:
//         'Swift, CoreML, Realm, Corelocation, alomofire, postgresql, java, spring.',
//       // картинка технологий для пк
//       technologiesImg:
//         'https://raw.githubusercontent.com/oneGo-inc/LandingPageImage/main/wins/winsSkils.png',
//       // картинка технологий для мобилки (такой же принцип у подходов - approaches)
//       technologiesImgMobile: './files/imgs/stack-mobile.png',
//       approaches: 'Viper, Solid, Scrum',
//       approachesImg:
//         'https://raw.githubusercontent.com/oneGo-inc/LandingPageImage/main/wins/winsTech.png',
//       approachesImgMobile: './files/imgs/approaches-mobile.png',
//       comment:
//         '”проект хорошо продуман технически и идейно. И экстремальный спорт, и Machine Learning сейчас в тренде ― тут же они слились в нечто совершенно новое и крутое.”',
//       commentImg:
//         'https://raw.githubusercontent.com/oneGo-inc/LandingPageImage/main/wins/winsReview.png',
//       commentName: 'Блог Selectel',
//     },
//     {
//       title: 'native 2',
//       date: '19 октябрь 2022',
//       img: './files/imgs/caseTemp.png',
//       type: ['native', 'design'],
//       task: 'Разработать приложение для бывалых зеков, основываясь на довольно размытуе Целевую аудиторию.',
//       invest:
//         'Так как приложение досталось нам от другой команды, то улучшим кодовую базу мы сократили расходы на обновление и поддержку приложения на 70%.',
//       devTime: '14 дней',
//       technologies: 'Swift, Combine, Node JS, Kotlin.',
//       technologiesImg: './files/imgs/stack.png',
//       technologiesImgMobile: './files/imgs/stack-mobile.png',
//       approaches: 'MVVM, Scrum, Solid',
//       approachesImg: './files/imgs/approaches.png',
//       approachesImgMobile: './files/imgs/approaches-mobile.png',
//       comment:
//         'Пацаны ваще красавы, сделали все в срок, мазги не делали, багов нет. А когда сервак лег метнулись кабанчиком, все поправили и бита уебидзе',
//       commentImg: './files/imgs/comment-photo.png',
//       commentName: 'Эрик Мушкет, CEO ONEGO',
//     },
//     {
//       title: 'native 3',
//       date: '29 октябрь 2022',
//       img: './files/imgs/caseTemp.png',
//       type: ['design'],

//       task: 'Разработать приложение для бывалых зеков, основываясь на довольно размытуе Целевую аудиторию.',
//       invest:
//         'Так как приложение досталось нам от другой команды, то улучшим кодовую базу мы сократили расходы на обновление и поддержку приложения на 70%.',
//       devTime: '14 дней',
//       technologies: 'Swift, Combine, Node JS, Kotlin.',
//       technologiesImg: './files/imgs/stack.png',
//       technologiesImgMobile: './files/imgs/stack-mobile.png',
//       approaches: 'MVVM, Scrum, Solid',
//       approachesImg: './files/imgs/approaches.png',
//       approachesImgMobile: './files/imgs/approaches-mobile.png',
//       comment:
//         'Пацаны ваще красавы, сделали все в срок, мазги не делали, багов нет. А когда сервак лег метнулись кабанчиком, все поправили и бита уебидзе',
//       commentImg: './files/imgs/comment-photo.png',
//       commentName: 'Эрик Мушкет, CEO ONEGO',
//     },
//     {
//       title: 'native 4',
//       date: '9 ноябрь 2022',
//       img: './files/imgs/caseTemp.png',
//       type: ['native'],

//       task: 'Разработать приложение для бывалых зеков, основываясь на довольно размытуе Целевую аудиторию.',
//       invest:
//         'Так как приложение досталось нам от другой команды, то улучшим кодовую базу мы сократили расходы на обновление и поддержку приложения на 70%.',
//       devTime: '14 дней',
//       technologies: 'Swift, Combine, Node JS, Kotlin.',
//       technologiesImg: './files/imgs/stack.png',
//       technologiesImgMobile: './files/imgs/stack-mobile.png',
//       approaches: 'MVVM, Scrum, Solid',
//       approachesImg: './files/imgs/approaches.png',
//       approachesImgMobile: './files/imgs/approaches-mobile.png',
//       comment:
//         'Пацаны ваще красавы, сделали все в срок, мазги не делали, багов нет. А когда сервак лег метнулись кабанчиком, все поправили и бита уебидзе',
//       commentImg: './files/imgs/comment-photo.png',
//       commentName: 'Эрик Мушкет, CEO ONEGO',
//     },
//   ],
// };

// commonData.cases = commonData.cases.map(
//   (el, index) =>
//     new Object({
//       id: index,
//       ...el,
//     })
// );

// commonData.comments = commonData.cases.map(
//   (el) =>
//     new Object({
//       text: el.comment,
//       name: el.commentName,
//       url: el.commentImg,
//     })
// );

// export default commonData;
