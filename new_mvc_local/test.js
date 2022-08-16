let destructObj = {
    id: '16606715696',
    time: {
      start: '2022-06-14T15:00:00.000Z',
      end: '2022-06-18T15:00:00.000Z'
    },
    warehouse: { id: 2, name: 'Минск' },
    title: 'Би-3',
    client: { id: 4, name: 'Пожарное депо №3 upd' },
    status: { id: 4, name: 'Отменен' },
    location: {
      city: { id: 5, name: 'Питер' },
      place: { id: 4, name: 'Беларусьфильм' }
    },
    manager: { id: 3, name: 'Алексей Гаптар' },
    notes: 'Тест заметки',
    phase: [],
    booking: [
      { id: '001.003.002', name: 'Stormy CC', qtt: 22 },
      { id: '001.001.007', name: 'Alpha Spot QWO 800', qtt: 4 },
      { id: '001.002.001', name: 'Shadow 1200', qtt: 29 },
      { id: '001.001.001', name: 'A.leda B-Eye K10', qtt: 6 },
      {
        id: '002.001.001',
        name: 'LR PRO 2.6 0.5x0.5m, 192x192 pixels',
        qtt: 15
      }
    ]
  }

  let {id, time: { start }, time: { end }, warehouse: { id: whId }, title, creator: { id: creatorId }} = destructObj;

//   let {id, time: { start }, time: { end }, warehouse: { id: whId }, title, creator: { id: creatorId }, client: { id: clientId }, status: { id: statusId }, location: { city: { id: cityId }, place: { id: placeId } }, manager: { id: managerId }, notes } = destructObj;

let eventRow = [];

  let unixTime = Date.now();

  eventRow.push(id);
  eventRow.push(whId);
  eventRow.push(title);
  eventRow.push(start.slice(0, 16));
  eventRow.push(end.slice(0, 16));
//   eventRow.push(managerId);
//   eventRow.push(cityId);
//   eventRow.push(placeId);
//   eventRow.push(clientId);
  eventRow.push(creatorId);
//   eventRow.push(statusId);
//   eventRow.push(notes);
//   eventRow.push(userId);
//   eventRow.push(unixTime);

  let i = 0;
  eventRow.map(item => {

      console.log(i, "item:", item);
      i++;
  })
