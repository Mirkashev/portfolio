export default class Authentication extends Phaser.Scene {
  constructor(assets) {
    super({ key: 'authentication' });
    this.assets = assets;
    this.isGirl = true;
    this.content = '';
    this.isCloseAuth = true;
  }

  async query(type) {
    let regBody = {
      username: document.getElementById('user').value,
      email: document.getElementById('remail').value,
      password: document.getElementById('rpassword').value,
      age: document.getElementById('age').value,
      country: document.getElementById('country').value,
    };

    let logBody = {
      username: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };

    let restBody = {
      email: document.getElementById('restEmail').value,
      username: document.getElementById('restUser').value,
    };

    if (type === 'register' && JSON.parse(regBody.age) < 18) {
      document.querySelector('.reg-wrong').classList.remove('hidden');
      document.querySelector('.reg-wrong').innerHTML = 'Age less than 18';
      return;
    }

    const response = await fetch(
      `https://doodle.theclownteam.ru/api/api/auth/${
        type === 'login' ? 'login' : type === 'register' ? 'register' : 'reset'
      }`,
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          type === 'login' ? logBody : type === 'register' ? regBody : restBody
        ),
      }
    );

    const parsed = await response.json();

    if (type !== 'restore' && response.ok) {
      localStorage.setItem('token', parsed.access_token);
      return;
    }
    if (type === 'restore' && response.ok) {
      this.scene.start('menu');
      return;
    }

    if (!response.ok) {
      document.querySelector('.reg-wrong').classList.remove('hidden');
      document.querySelector('.reg-wrong').innerHTML = parsed.message;

      document.querySelector('.auth-wrong').classList.remove('hidden');
      document.querySelector('.auth-wrong').innerHTML = parsed.message;

      document.querySelector('.restore-wrong').classList.remove('hidden');
      document.querySelector('.restore-wrong').innerHTML = parsed.message;
    }
  }

  jumpingModel() {
    //left anim
    this.girl = this.physics.add
      .image(
        this.game.config.width * 0.78,
        this.game.config.height * 0.5 + 258,
        this.assets.playerGirl
      )
      .setScale(0.64);

    this.destructive = this.physics.add.image(
      this.game.config.width * 0.8,
      this.game.config.height * 0.5 + 323,
      this.assets.tiles.destructive
    );
    //right anim
    this.men = this.playerMen = this.physics.add
      .image(
        this.game.config.width * 0.22,
        this.game.config.height * 0.5 + 200,
        this.assets.player
      )
      .setScale(0.64);
    this.playerMen.flipX = true;
    this.playerMen.rotation = 25;

    this.disappearing = this.physics.add.image(
      this.game.config.width * 0.2,
      this.game.config.height * 0.5 + 363,
      this.assets.tiles.disappearing
    );
    this.spring = this.physics.add.image(
      this.game.config.width * 0.2,
      this.game.config.height * 0.5 + 329,
      this.assets.spring
    );
  }

  toggleAuthentication(state) {
    this.logo.setAlpha(state);
    this.girl.setAlpha(state);
    this.destructive.setAlpha(state);
    this.men.setAlpha(state);
    this.disappearing.setAlpha(state);
    this.spring.setAlpha(state);
    this.login.setAlpha(state);
    this.signup.setAlpha(state);
    this.byLogitech.setAlpha(state);
  }

  switchActive(page) {
    document.querySelector('.register').classList.remove('active');
    document.querySelector('.authorization').classList.remove('active');
    document.querySelector('.restore').classList.remove('active');

    // document
    //   .querySelector('.authorization__show-password')
    //   .classList.remove('hidden');
    document.getElementById('password').type = 'password';
    // document
    //   .querySelector('.register__show-password')
    //   .classList.remove('hidden');
    document.getElementById('rpassword').type = 'password';

    document.querySelector('.reg-wrong').classList.add('hidden');
    document.querySelector('.auth-wrong').classList.add('hidden');
    document.querySelector('.restore-wrong').classList.add('hidden');

    this.close.removeAllListeners();

    if (page === 'login') {
      document.querySelector('.authorization').classList.add('active');
    }

    if (page === 'signup') {
      document.querySelector('.register').classList.add('active');
    }

    if (page === 'restore') {
      document.querySelector('.restore').classList.add('active');
    }

    if (page === 'authentication') {
      this.toggleAuthentication(1);
      // this.isCloseAuth = true;
      setTimeout(() => {
        this.close.on('pointerdown', () => {
          this.scene.start('menu');
        });
      }, 200);
    } else {
      this.toggleAuthentication(0);
      this.close.on('pointerdown', () => this.switchActive('authentication'));
    }
  }

  createButton(scene, texture, xPos, yPos) {
    return this.add
      .image(xPos, yPos, texture)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.switchActive(scene);
      });
  }

  create() {
    this.background = this.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      this.assets.background
    );

    this.logo = this.physics.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5 - 390,
      this.assets.scenes.logo
    );
    // .setScale(1.8);

    this.login = this.createButton(
      'login',
      this.assets.scenes.login,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5 - 84
    );

    this.signup = this.createButton(
      'signup',
      this.assets.scenes.signup,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5 + 84
    );

    this.byLogitech = this.add.image(
      this.game.config.width * 0.825,
      this.game.config.height * 0.95,
      this.assets.scenes.byLogi
    );

    this.close = this.add
      .image(
        this.game.config.width * 0.95,
        this.game.config.height * 0.04,
        this.assets.scenes.close
      )
      .setScale(1.5)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        document
          .querySelector('.game__close-full-screen')
          .classList.remove('hidden');

        this.scene.start('menu');
      });

    this.jumpingModel();

    const authFunc = async (query) => {
      await this.query(query);

      if (
        !!localStorage.getItem('token') &&
        localStorage.getItem('token') !== 'undefined'
      ) {
        document.querySelector('.register').classList.remove('active');
        document.querySelector('.authorization').classList.remove('active');
        this.scene.start('choseModel');
      }
    };

    document.querySelector('.register__form').onsubmit = (e) => {
      e.preventDefault();
      authFunc('register');
    };

    document.querySelector('.authorization__form').onsubmit = (e) => {
      e.preventDefault();
      authFunc('login');
    };

    document.querySelector('.restore__form').onsubmit = (e) => {
      e.preventDefault();
      authFunc('restore');
    };

    document.querySelector('.authorization-restore').onclick = () => {
      this.switchActive('restore');
    };

    document.querySelector('.authorization__show-password').onclick = () => {
      const input = document.getElementById('password');
      input.type = input.type === 'text' ? 'password' : 'text';
    };

    document.querySelector('.register__show-password').onclick = () => {
      const input = document.getElementById('rpassword');
      input.type = input.type === 'text' ? 'password' : 'text';
    };
  }
}
