import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'root',
    password: 'root',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

 
for (let i = 0; i < 100; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(), 
    name: Mock.Random.cname(),
    id_card :Mock.mock('@id'),
    phone : Mock.mock( /\d{11,11}/) , 
    addr: Mock.mock('@county(true)'),  //地址
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    other: Mock.mock( "★★★" )
  }));
}

export { LoginUsers, Users };
