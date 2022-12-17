import { choice, randint, sample } from 'random';
import { sleep } from 'time';
import { system } from 'os';

var _pj;

var bak_valor_ultima_carta, canto_jug1, canto_jug2, canto_jug3, canto_jug4, continuar_partida, equipo1_pts, equipo2_pts, ganador_en_juego, jug1, jug2, jug3, jug4, maso_jugador1, maso_jugador2, maso_jugador3, maso_jugador4, maso_revuelto, mesa, mesa_valor, nombre_carta, nombre_jug1, pts1, pts2, pts3, pts4, repartidor, ultimo_agarrar_carta_id, ultimo_dejar_carta_mesa_id, valor_carta;

function _pj_snippets(container) {
  function in_es6(left, right) {
    if (right instanceof Array || typeof right === "string") {
      return right.indexOf(left) > -1;
    } else {
      if (right instanceof Map || right instanceof Set || right instanceof WeakMap || right instanceof WeakSet) {
        return right.has(left);
      } else {
        return left in right;
      }
    }
  }

  container["in_es6"] = in_es6;
  return container;
}

_pj = {};

_pj_snippets(_pj);

maso_revuelto = sample(range(0, 40), 40);
nombre_carta = ["Uno de picas", "Dos de picas", "Tres de picas", "Cuatro de picas", "Cinco de picas", "Seis de picas", "Siete de picas", "Diez de picas", "Once de picas", "Doce de picas", "Uno de bastos", "Dos de bastos", "Tres de bastos", "Cuatro de bastos", "Cinco de bastos", "Seis de bastos", "Siete de bastos", "Diez de bastos", "Once de bastos", "Doce de bastos", "Uno de copas", "Dos de copas", "Tres de copas", "Cuatro de copas", "Cinco de copas", "Seis de copas", "Siete de copas", "Diez de copas", "Once de copas", "Doce de copas", "Uno de monedas", "Dos de monedas", "Tres de monedas", "Cuatro de monedas", "Cinco de monedas", "Seis de monedas", "Siete de monedas", "Diez de monedas", "Once de monedas", "Doce de monedas"];
valor_carta = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
mesa = [];
mesa_valor = [];
jug1 = [];
jug2 = [];
jug3 = [];
jug4 = [];
maso_jugador1 = 0;
maso_jugador2 = 0;
maso_jugador3 = 0;
maso_jugador4 = 0;
pts1 = 0;
pts2 = 0;
pts3 = 0;
pts4 = 0;
canto_jug1 = [0, 0, 0, 0];
canto_jug2 = [0, 0, 0, 0];
canto_jug3 = [0, 0, 0, 0];
canto_jug4 = [0, 0, 0, 0];
equipo1_pts = 0;
equipo2_pts = 0;
ultimo_dejar_carta_mesa_id = 0;
ultimo_agarrar_carta_id = 0;
bak_valor_ultima_carta = 0;
nombre_jug1 = "";

function mesa_a_valor() {
 
  mesa_valor.clear();
  let i = 0;

  for (var j, _pj_c = 0, _pj_a = mesa, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
   let j = _pj_a[_pj_c];
    mesa_valor.insert(i, valor_carta[j]);
    i = i + 1;
  }
}

function repartir_mesa() {
  let copia_carta_dup, dup, i, index_carta_dup, newlist, replace_carta, valor_replace_carta;
  
  i = 0;

  while (i <= 3) {
    mesa.insert(i, maso_revuelto[i]);
    i = i + 1;
  }

  mesa_a_valor();
  newlist = [];
  dup = 0;

  for (var j, _pj_c = 0, _pj_a = mesa_valor, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    j = _pj_a[_pj_c];

    if (!_pj.in_es6(j, newlist)) {
      newlist.append(j);
    } else {
      dup = j;
    }
  }

  if (dup > 0) {
    index_carta_dup = mesa_valor.index(dup);
    copia_carta_dup = mesa[index_carta_dup];
    delete mesa_valor[index_carta_dup];
    delete mesa[index_carta_dup];

    while (true) {
      replace_carta = randint(4, 39);
      valor_replace_carta = valor_carta[replace_carta];

      if (_pj.in_es6(valor_replace_carta, mesa_valor)) {
        continue;
      } else {
        break;
      }
    }

    mesa.append(replace_carta);
    maso_revuelto[replace_carta] = copia_carta_dup;
    mesa_a_valor();
  }
}

function repartir_jug(i) {
  jug1.insert(0, maso_revuelto[i]);
  i = i + 1;
  jug1.insert(1, maso_revuelto[i]);
  i = i + 1;
  jug1.insert(2, maso_revuelto[i]);
  i = i + 1;
  jug2.insert(0, maso_revuelto[i]);
  i = i + 1;
  jug2.insert(1, maso_revuelto[i]);
  i = i + 1;
  jug2.insert(2, maso_revuelto[i]);
  i = i + 1;
  jug3.insert(0, maso_revuelto[i]);
  i = i + 1;
  jug3.insert(1, maso_revuelto[i]);
  i = i + 1;
  jug3.insert(2, maso_revuelto[i]);
  i = i + 1;
  jug4.insert(0, maso_revuelto[i]);
  i = i + 1;
  jug4.insert(1, maso_revuelto[i]);
  i = i + 1;
  jug4.insert(2, maso_revuelto[i]);
}

function ronda(cuenta_ronda) {
  if (cuenta_ronda === 1) {
    repartir_jug(4);
  } else {
    if (cuenta_ronda === 2) {
      repartir_jug(16);
    } else {
      if (cuenta_ronda === 3) {
        repartir_jug(28);
      }
    }
  }
}

function elegir_repartidor() {
  let aux, baraja_repartidor, baraja_repartidor_valor, carta_alta, copy_baraja_repartidor_valor, i, id_ganador, index, list_id, list_id2, num_carta, opcion;
  baraja_repartidor = [];
  baraja_repartidor_valor = [];
  maso_revuelto = sample(range(0, 40), 40);
  i = 0;

  while (i <= 3) {
    for (var j, _pj_c = 0, _pj_a = maso_revuelto, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      j = _pj_a[_pj_c];
      aux = valor_carta[j];

      if (!_pj.in_es6(aux, baraja_repartidor_valor)) {
        baraja_repartidor.append(j);
        baraja_repartidor_valor.append(aux);

        if (i <= 2) {
          i += 1;
        } else {
          break;
        }
      }
    }

    if (i === 3) {
      break;
    }
  }

  copy_baraja_repartidor_valor = baraja_repartidor_valor.copy();
  copy_baraja_repartidor_valor.sort();
  carta_alta = copy_baraja_repartidor_valor.slice(-1)[0];
  index = baraja_repartidor_valor.index(carta_alta);
  num_carta = baraja_repartidor[index];

  while (true) {
    try {
      system("cls");
      console.log("");
      console.log("###############################################################################");
      console.log("#                                                                             #");
      console.log("#                                                                             #");
      console.log("#                  Elige un numero del 1 al 4 y pulsa Enter:                  #");
      console.log("#                                                                             #");
      console.log("#                                                                             #");
      console.log("###############################################################################");
      console.log(" ");
      opcion = Number.parseInt(input("                                      "));

      if (opcion === 1) {
        list_id = ["el Jugador 1", "el Jugador 2", "el Jugador 3", "el Jugador 4"];
        list_id[0] = nombre_jug1;
        list_id2 = [0, 1, 2, 3];
        break;
      } else {
        if (opcion === 2) {
          list_id = ["el Jugador 4", "Jugador 1", "el Jugador 2", "el Jugador 3"];
          list_id[1] = nombre_jug1;
          list_id2 = [3, 0, 1, 2];
          break;
        } else {
          if (opcion === 3) {
            list_id = ["el Jugador 3", "el Jugador 4", "Jugador 1", "el Jugador 2"];
            list_id[2] = nombre_jug1;
            list_id2 = [2, 3, 0, 1];
            break;
          } else {
            if (opcion === 4) {
              list_id = ["el Jugador 2", "el Jugador 3", "el Jugador 4", "el Jugador 1"];
              list_id[3] = nombre_jug1;
              list_id2 = [1, 2, 3, 0];
              break;
            }
          }
        }
      }
    } catch (e) {
      continue;
    }
  }

  opcion = opcion - 1;

  if (opcion === index) {
    id_ganador = list_id2[opcion];
  } else {
    id_ganador = list_id2[index];
  }

  i = 0;

  while (i <= 4) {
    system("cls");
    console.log("");
    console.log("###############################################################################");
    console.log("");
    console.log("");
    console.log(`        1.-(${valor_carta[baraja_repartidor[0]]}) ${nombre_carta[baraja_repartidor[0]]}        `);

    if (i >= 1) {
      console.log(`        2.-(${valor_carta[baraja_repartidor[1]]}) ${nombre_carta[baraja_repartidor[1]]}        `);
    }

    if (i >= 2) {
      console.log(`        3.-(${valor_carta[baraja_repartidor[2]]}) ${nombre_carta[baraja_repartidor[2]]}        `);
    }

    if (i >= 3) {
      console.log(`        4.-(${valor_carta[baraja_repartidor[3]]}) ${nombre_carta[baraja_repartidor[3]]}        `);
    }

    if (i >= 4) {
      console.log("______________________________________________________________________________");
      console.log("");
      console.log(`   El repartidor sera ${list_id[index]} con la carta alta (${carta_alta}) ${nombre_carta[num_carta]}`);
      console.log("");
      console.log("______________________________________________________________________________");
      console.log("");
      console.log("");
      console.log("###############################################################################");
    }

    i += 1;
    sleep(1);
  }

  console.log("");
  console.log("Pulse Enter para continuar");
  input();
  return id_ganador;
}

function incrementar_letra(letra) {
  return chr(ord(letra) + 1);
}

function mostrar_mesa() {
  system("cls");
  banner_pts();
  console.log("###############################################################################");
  console.log("#                                                                             #");
  console.log("#                                  Cartas                                     #");
  console.log("#                                en la mesa                                   #");
  console.log("#                                                                             #");
  console.log("###############################################################################");

  for (var i, _pj_c = 0, _pj_a = mesa, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    i = _pj_a[_pj_c];
    console.log(`         · (${valor_carta[i]})  ${nombre_carta[i]}                         `);
  }
}

function mostrar_cartas() {
  let letra;
  
  console.log("");
  console.log("                           Estas son tus cartas                               ");
  console.log("");
  letra = "a";

  for (var i, _pj_c = 0, _pj_a = jug1, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    i = _pj_a[_pj_c];
    console.log(" ", letra, ".", "(", valor_carta[i], ")", nombre_carta[i]);
    letra = incrementar_letra(letra);
  }
}

function juego(repartidor) {
  let cuenta_ronda, id_ganador, pasada, pts;
  cuenta_ronda = 1;

  while (cuenta_ronda <= 3) {
    ronda(cuenta_ronda);
    pasada = 0;

    if (repartidor === 0) {
      while (pasada <= 2) {
        if (pasada === 0) {
          ronda_splash(cuenta_ronda);
        }

        mostrar_mesa();
        console.log("");
        console.log(" Pulsa Enter para continuar...");
        input();
        system("cls");
        console.log(" ");
        console.log("                               Turno Jugador 2                            ");
        console.log(" ");
        turno_cpu(2);
        mostrar_mesa();
        console.log(" ");
        console.log("                               Turno Jugador 3                            ");
        console.log(" ");
        turno_cpu(3);
        mostrar_mesa();
        console.log(" ");
        console.log("                               Turno Jugador 4                            ");
        console.log(" ");
        turno_cpu(4);
        system("cls");
        mostrar_mesa();
        console.log(" ");
        console.log("                                Turno {nombre_jug1}                            ");
        console.log(" ");
        turno_jug1();
        system("cls");
        mostrar_mesa();
        ganador_en_juego = revisar_pts();

        if (ganador_en_juego === true) {
          return ganador_en_juego;
        } else {
          pasada = pasada + 1;
          [pts, id_ganador] = canto_mayor(repartidor);

          if (id_ganador === 1) {
            pts1 = pts1 + pts;
          } else {
            if (id_ganador === 2) {
              pts2 = pts2 + pts;
            } else {
              if (id_ganador === 3) {
                pts3 = pts3 + pts;
              } else {
                if (id_ganador === 4) {
                  pts4 = pts4 + pts;
                }
              }
            }
          }

          cuenta_ronda = cuenta_ronda + 1;
          console.log(" Pulsa Enter para continuar...");
          input();

          if (cuenta_ronda !== 4) {
            ronda_splash(cuenta_ronda);
          }
        }
      }
    } else {
      if (repartidor === 1) {
        while (pasada <= 2) {
          if (pasada === 0) {
            ronda_splash(cuenta_ronda);
          }

          mostrar_mesa();
          console.log("");
          console.log(" Pulsa Enter para continuar...");
          input();
          console.log(" ");
          console.log("                              Turno Jugador 3                            ");
          console.log(" ");
          turno_cpu(3);
          mostrar_mesa();
          console.log(" ");
          console.log("                              Turno Jugador 4                            ");
          console.log(" ");
          turno_cpu(4);
          system("cls");
          mostrar_mesa();
          console.log(" ");
          console.log("                              Turno {nombre_jug1}                            ");
          console.log(" ");
          turno_jug1();
          system("cls");
          mostrar_mesa();
          console.log(" ");
          console.log("                              Turno Jugador 2                            ");
          console.log(" ");
          turno_cpu(2);
          mostrar_mesa();
          ganador_en_juego = revisar_pts();

          if (ganador_en_juego === true) {
            return ganador_en_juego;
          } else {
            pasada = pasada + 1;
          }

          if (pasada === 3) {
            [pts, id_ganador] = canto_mayor(repartidor);

            if (id_ganador === 1) {
              pts1 = pts1 + pts;
            } else {
              if (id_ganador === 2) {
                pts2 = pts2 + pts;
              } else {
                if (id_ganador === 3) {
                  pts3 = pts3 + pts;
                } else {
                  if (id_ganador === 4) {
                    pts3 = pts4 + pts;
                  }
                }
              }
            }

            cuenta_ronda = cuenta_ronda + 1;
            console.log(" Pulsa Enter para continuar...");
            input();

            if (cuenta_ronda !== 4) {
              ronda_splash(cuenta_ronda);
            }
          }
        }
      } else {
        if (repartidor === 2) {
          while (pasada <= 2) {
            if (pasada === 0) {
              ronda_splash(cuenta_ronda);
            }

            mostrar_mesa();
            console.log("");
            console.log(" Pulsa Enter para continuar...");
            input();
            system("cls");
            console.log(" ");
            console.log("                             Turno Jugador 4                            ");
            console.log(" ");
            turno_cpu(4);
            system("cls");
            mostrar_mesa();
            console.log(" ");
            console.log("                              Turno {nombre_jug1}                            ");
            console.log(" ");
            turno_jug1();
            system("cls");
            mostrar_mesa();
            console.log(" ");
            console.log("                              Turno Jugador 2                            ");
            console.log(" ");
            turno_cpu(2);
            mostrar_mesa();
            console.log(" ");
            console.log("                              Turno Jugador 3                            ");
            console.log(" ");
            turno_cpu(3);
            mostrar_mesa();
            ganador_en_juego = revisar_pts();

            if (ganador_en_juego === true) {
              return ganador_en_juego;
            } else {
              pasada = pasada + 1;
            }

            if (pasada === 3) {
              [pts, id_ganador] = canto_mayor(repartidor);

              if (id_ganador === 1) {
                pts1 = pts1 + pts;
              } else {
                if (id_ganador === 2) {
                  pts2 = pts2 + pts;
                } else {
                  if (id_ganador === 3) {
                    pts3 = pts3 + pts;
                  } else {
                    if (id_ganador === 4) {
                      pts4 = pts4 + pts;
                    }
                  }
                }
              }

              cuenta_ronda = cuenta_ronda + 1;
              console.log(" Pulsa Enter para continuar...");
              input();

              if (cuenta_ronda !== 4) {
                ronda_splash(cuenta_ronda);
              }
            }
          }
        } else {
          if (repartidor === 3) {
            while (pasada <= 2) {
              if (pasada === 0) {
                ronda_splash(cuenta_ronda);
              }

              mostrar_mesa();
              console.log("");
              console.log(" Pulsa Enter para continuar...");
              input();
              system("cls");
              console.log(" ");
              console.log("                              Turno {nombre_jug1}                            ");
              console.log(" ");
              turno_jug1();
              system("cls");
              mostrar_mesa();
              console.log(" ");
              console.log("                              Turno Jugador 2                            ");
              console.log(" ");
              turno_cpu(2);
              mostrar_mesa();
              console.log(" ");
              console.log("                              Turno Jugador 3                            ");
              console.log(" ");
              turno_cpu(3);
              mostrar_mesa();
              console.log(" ");
              console.log("                              Turno Jugador 4                            ");
              console.log(" ");
              turno_cpu(4);
              system("cls");
              mostrar_mesa();
              ganador_en_juego = revisar_pts();

              if (ganador_en_juego === true) {
                return ganador_en_juego;
              } else {
                pasada = pasada + 1;
              }

              if (pasada === 3) {
                [pts, id_ganador] = canto_mayor(repartidor);

                if (id_ganador === 1) {
                  pts1 = pts1 + pts;
                } else {
                  if (id_ganador === 2) {
                    pts2 = pts2 + pts;
                  } else {
                    if (id_ganador === 3) {
                      pts3 = pts3 + pts;
                    } else {
                      if (id_ganador === 4) {
                        pts4 = pts4 + pts;
                      }
                    }
                  }
                }

                cuenta_ronda = cuenta_ronda + 1;
                console.log("");
                console.log(" Pulsa Enter para continuar...");
                input();

                if (cuenta_ronda !== 4) {
                  ronda_splash(cuenta_ronda);
                }
              }
            }
          }
        }
      }
    }
  }

  quien_se_lleva_mesa();
  return false;
}

function agregar_a_mesa(carta, turno_id) {
  let dup, index, j, k, maso, newlist;
  maso = 0;
  newlist = [];
  index = 0;
  mesa.append(carta);
  mesa_a_valor();
  k = 0;
  dup = 0;

  for (var k, _pj_c = 0, _pj_a = mesa_valor, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    k = _pj_a[_pj_c];

    if (!_pj.in_es6(k, newlist)) {
      newlist.append(k);
    } else {
      dup = k;
      index = mesa_valor.index(k);
      delete mesa[index];
      mesa_valor.remove(k);
      ultimo_agarrar_carta_id = turno_id;
      maso = maso + 1;
    }
  }

  if (dup !== 0) {
    index = mesa_valor.index(dup);
    delete mesa[index];
    mesa_valor.remove(dup);
    maso = maso + 1;
  }

  if (maso >= 2) {
    if (dup !== 7) {
      dup = dup + 1;
    } else {
      dup = dup + 3;
    }

    k = 0;
    j = 0;

    while (true) {
      for (var i, _pj_c = 0, _pj_a = mesa_valor, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
        i = _pj_a[_pj_c];

        if (dup === i) {
          index = mesa_valor.index(i);
          delete mesa[index];
          mesa_valor.remove(i);
          maso = maso + 1;

          if (dup !== 7) {
            dup = dup + 1;
          } else {
            dup = dup + 3;
          }
        }
      }

      if (!_pj.in_es6(dup, mesa_valor)) {
        break;
      }
    }
  } else {
    if (maso === 0) {
      bak_valor_ultima_carta = mesa_valor.slice(-1)[0];
      ultimo_dejar_carta_mesa_id = turno_id;
      return Number.parseInt(maso);
    }
  }

  if (mesa.length === 0) {
    system("cls");
    console.log(" ______________________________________________________________________________");
    console.log(`                                                               `);
    console.log(`                  El jugador${turno_id} ha hecho 4 en mesa +4 pts         `);
    console.log(`                                                                `);
    console.log(" ______________________________________________________________________________");
    console.log("");
    console.log(" Pulsa Enter para continuar...");
    input();

    if (turno_id === 1) {
      pts1 = pts1 + 4;
    } else {
      if (turno_id === 2) {
        pts2 = pts2 + 4;
      } else {
        if (turno_id === 2) {
          pts3 = pts3 + 4;
        } else {
          if (turno_id === 2) {
            pts3 = pts3 + 4;
          }
        }
      }
    }
  }

  return Number.parseInt(maso);
}

function comprobar_caida(valor_carta_jug, turno_id) {
  let jug_anterior;
  jug_anterior = turno_id - 1;

  if (valor_carta_jug !== bak_valor_ultima_carta) {
    return [false, 0];
  } else {
    if (valor_carta_jug >= 1 && valor_carta_jug <= 7 && ultimo_dejar_carta_mesa_id === jug_anterior) {
      bak_valor_ultima_carta = 0;
      return [true, 1];
    } else {
      if (valor_carta_jug === 10 && ultimo_dejar_carta_mesa_id === jug_anterior) {
        bak_valor_ultima_carta = 0;
        return [true, 2];
      } else {
        if (valor_carta_jug === 11 && ultimo_dejar_carta_mesa_id === jug_anterior) {
          bak_valor_ultima_carta = 0;
          return [true, 3];
        } else {
          if (valor_carta_jug === 12 && ultimo_dejar_carta_mesa_id === jug_anterior) {
            bak_valor_ultima_carta = 0;
            return [bool(true), Number.parseInt(4)];
          }
        }
      }
    }
  }

  return [false, 0];
}

function turno_jug1() {
  let caida, i, j, opcion, pts;
  system("cls");

  if (jug1.length !== 0) {
    mostrar_mesa();
    mostrar_cartas();

    if (jug1.length === 3) {
      canto_jug1 = comprobar_canto_jug(jug1, 1);
      console.log(" ");
    }

    console.log("");
    opcion = "";

    while (true) {
      opcion = input("  Selecciona la carta que desea jugar (a, b, c) y pulsa Enter: ").toString();
      i = 0;

      if (opcion === "a") {
        i = jug1[0];
        j = agregar_a_mesa(i, 1);
        maso_jugador1 = maso_jugador1 + j;
        jug1.remove(i);
        system("cls");
        mostrar_mesa();
        console.log(" ");
        console.log(`     ${nombre_jug1} coloco en la mesa un (${valor_carta[i]})  ${nombre_carta[i]}    `);
        console.log(" ");
        console.log(" Pulsa Enter para continuar...");
        input();

        if (j !== 0) {
          [caida, pts] = comprobar_caida(valor_carta[i], 1);
          pts1 = pts1 + pts;

          if (caida === true) {
            console.log(" ______________________________________________________________________________");
            console.log("                                                                 ");
            console.log(`                        ${nombre_jug1} ha hecho caida de ${pts} pts            `);
            console.log("                                                                ");
            console.log(" ______________________________________________________________________________");
            console.log("");
            console.log(" Pulsa Enter para continuar...");
            input();
          }
        }

        system("cls");
        mostrar_mesa();
        break;
      } else {
        if (opcion === "b") {
          i = jug1[1];
          j = agregar_a_mesa(i, 1);
          maso_jugador1 = maso_jugador1 + j;
          jug1.remove(i);
          system("cls");
          mostrar_mesa();
          console.log(" ");
          console.log(`     ${nombre_jug1} coloco en la mesa un (${valor_carta[i]})  ${nombre_carta[i]}    `);
          console.log(" ");
          console.log("Pulsa Enter para continuar...");
          input();

          if (j !== 0) {
            [caida, pts] = comprobar_caida(valor_carta[i], 1);
            pts1 = pts1 + pts;

            if (caida === true) {
              console.log(" ______________________________________________________________________________");
              console.log("                                                                 ");
              console.log(`                        ${nombre_jug1} ha hecho caida de ${pts} pts            `);
              console.log("                                                                ");
              console.log(" ______________________________________________________________________________");
              console.log("");
              console.log(" Pulsa Enter para continuar...");
              input();
            }
          }

          system("cls");
          mostrar_mesa();
          break;
        } else {
          if (opcion === "c") {
            i = jug1[2];
            j = agregar_a_mesa(i, 1);
            maso_jugador1 = maso_jugador1 + j;
            jug1.remove(i);
            system("cls");
            mostrar_mesa();
            console.log(" ");
            console.log(`     ${nombre_jug1} coloco en la mesa un (${valor_carta[i]})  ${nombre_carta[i]}    `);
            console.log(" ");
            console.log("Pulsa Enter para continuar...");
            input();

            if (j !== 0) {
              [caida, pts] = comprobar_caida(valor_carta[i], 1);
              pts1 = pts1 + pts;

              if (caida === true) {
                console.log(" ______________________________________________________________________________");
                console.log("                                                                 ");
                console.log(`                        ${nombre_jug1} ha hecho caida de ${pts} pts            `);
                console.log("                                                                ");
                console.log(" ______________________________________________________________________________");
                console.log("");
                console.log(" Pulsa Enter para continuar...");
                input();
              }
            }

            system("cls");
            mostrar_mesa();
            break;
          }
        }
      }
    }
  }
}

function mano_a_valor(mano) {
  let i, mano_valor_2;
  i = 0;
  mano_valor_2 = [];

  for (var j, _pj_c = 0, _pj_a = mano, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    j = _pj_a[_pj_c];
    mano_valor_2.insert(i, valor_carta[j]);
    i = i + 1;
  }

  return mano_valor_2;
}

function turno_cpu(cpuid) {
  let caida, i, index, j, jug2_valor, jug3_valor, jug4_valor, pts;

  if (cpuid === 2) {
    if (jug2.length === 3) {
      canto_jug2 = comprobar_canto_jug(jug2, 2);

      if (canto_jug2[0] !== 0) {
        console.log("");
        console.log("Pulsa Enter para continuar...");
        console.log("");
        input();
      }
    }

    console.log(" ");

    if (jug2.length !== 0) {
      index = 0;
      jug2_valor = mano_a_valor(jug2);

      if (bak_valor_ultima_carta !== 0 && _pj.in_es6(bak_valor_ultima_carta, jug2_valor)) {
        index = jug2_valor.index(bak_valor_ultima_carta);
      } else {
        if (jug2.length === 3) {
          index = randint(0, 2);
        } else {
          if (jug2.length === 2) {
            index = randint(0, 1);
          } else {
            if (jug2.length <= 1) {
              index = 0;
            }
          }
        }
      }

      i = jug2[index];
      j = agregar_a_mesa(i, 2);
      maso_jugador2 = maso_jugador2 + j;
      jug2.remove(i);
      system("cls");
      console.log(" ");
      mostrar_mesa();
      console.log(" ");
      console.log(`     El jugador 2 coloco en la mesa un (${valor_carta[i]})  ${nombre_carta[i]}    `);
      console.log(" ");

      if (j !== 0) {
        [caida, pts] = comprobar_caida(valor_carta[i], 2);
        pts2 = pts2 + pts;

        if (caida === true) {
          console.log(" ______________________________________________________________________________");
          console.log("                                                                 ");
          console.log(`                     El jugador 2 ha hecho caida de ${pts} pts            `);
          console.log("                                                                ");
          console.log(" ______________________________________________________________________________");
          console.log("");
          console.log(" Pulsa Enter para continuar...");
          input();
        }
      }
    }
  } else {
    if (cpuid === 3) {
      if (jug3.length === 3) {
        canto_jug3 = comprobar_canto_jug(jug3, 3);

        if (canto_jug2[0] !== 0) {
          console.log("Pulsa Enter para continuar...");
          input();
        }
      }

      console.log(" ");

      if (jug3.length !== 0) {
        index = 0;
        jug3_valor = mano_a_valor(jug3);

        if (bak_valor_ultima_carta !== 0 && _pj.in_es6(bak_valor_ultima_carta, jug3_valor)) {
          index = jug3_valor.index(bak_valor_ultima_carta);
        } else {
          if (jug3.length === 3) {
            index = randint(0, 2);
          } else {
            if (jug3.length === 2) {
              index = randint(0, 1);
            } else {
              if (jug3.length <= 1) {
                index = 0;
              }
            }
          }
        }

        i = jug3[index];
        j = agregar_a_mesa(i, 3);
        maso_jugador3 = maso_jugador3 + j;
        jug3.remove(i);
        system("cls");
        console.log(" ");
        mostrar_mesa();
        mostrar_mesa();
        console.log(" ");
        console.log(`     El jugador 3 coloco en la mesa un (${valor_carta[i]})  ${nombre_carta[i]}    `);
        console.log(" ");

        if (j !== 0) {
          [caida, pts] = comprobar_caida(valor_carta[i], 3);
          pts3 = pts3 + pts;

          if (caida === true) {
            console.log(" ______________________________________________________________________________");
            console.log("                                                                 ");
            console.log(`                     El jugador 3 ha hecho caida de ${pts} pts            `);
            console.log("                                                                ");
            console.log(" ______________________________________________________________________________");
            console.log("");
            console.log(" Pulsa Enter para continuar...");
            input();
          }
        }
      }
    } else {
      if (cpuid === 4) {
        if (jug4.length === 3) {
          canto_jug4 = comprobar_canto_jug(jug4, 4);

          if (canto_jug2[0] !== 0) {
            console.log(" Pulsa Enter para continuar...");
            input();
          }
        }

        console.log(" ");

        if (jug4.length !== 0) {
          index = 0;
          jug4_valor = mano_a_valor(jug4);

          if (bak_valor_ultima_carta !== 0 && _pj.in_es6(bak_valor_ultima_carta, jug4_valor)) {
            index = jug4_valor.index(bak_valor_ultima_carta);
          } else {
            if (jug4.length === 3) {
              index = randint(0, 2);
            } else {
              if (jug4.length === 2) {
                index = randint(0, 1);
              } else {
                if (jug4.length === 1) {
                  index = 0;
                }
              }
            }
          }

          i = jug4[index];
          j = agregar_a_mesa(i, 4);
          maso_jugador4 = maso_jugador4 + j;
          jug4.remove(i);
          system("cls");
          console.log(" ");
          mostrar_mesa();
          mostrar_mesa();
          console.log(" ");
          console.log(`     El jugador 4 coloco en la mesa un (${valor_carta[i]})  ${nombre_carta[i]}    `);
          console.log(" ");

          if (j !== 0) {
            [caida, pts] = comprobar_caida(valor_carta[i], 4);
            pts4 = pts4 + pts;

            if (caida === true) {
              console.log(" ______________________________________________________________________________");
              console.log("                                                                 ");
              console.log(`                     El jugador 4 ha hecho caida de ${pts} pts            `);
              console.log("                                                                ");
              console.log(" ______________________________________________________________________________");
              console.log("");
              console.log(" Pulsa Enter para continuar...");
              input();
            }
          }
        }
      }
    }
  }

  console.log("Pulsa Enter para continuar...");
  input();
}

function resultados() {
  let equipo1_maso, equipo2_maso, sumar_pts_cartas_1, sumar_pts_cartas_2, total_equipo1, total_equipo2;
  equipo1_pts = pts1 + pts3;
  equipo2_pts = pts2 + pts4;
  equipo1_maso = maso_jugador1 + maso_jugador3;
  equipo2_maso = maso_jugador2 + maso_jugador4;

  if (equipo1_maso > 20) {
    sumar_pts_cartas_1 = equipo1_maso - 20;

    if (sumar_pts_cartas_1 < 0) {
      sumar_pts_cartas_1 = sumar_pts_cartas_1 * -1;
    }
  } else {
    sumar_pts_cartas_1 = 0;
  }

  if (equipo2_maso > 20) {
    sumar_pts_cartas_2 = equipo1_maso - 20;

    if (sumar_pts_cartas_2 < 0) {
      sumar_pts_cartas_2 = sumar_pts_cartas_2 * -1;
    }
  } else {
    sumar_pts_cartas_2 = 0;
  }

  total_equipo1 = equipo1_pts + sumar_pts_cartas_1;
  total_equipo2 = equipo2_pts + sumar_pts_cartas_2;
  system("cls");
  console.log("");
  console.log("#############################################################################");
  console.log("                                                                             ");
  console.log("                          TABLA DE PUNTUAJE                           ");
  console.log("                                                                             ");
  console.log(`            ${nombre_jug1} y Jug. 3 = ${equipo1_pts}pts |  Jug. 2 y Jug. 4 = ${equipo2_pts}pts         `);
  console.log("                                                                             ");
  console.log("_____________________________________________________________________________");
  console.log("                                                                             ");
  console.log("              CUANTA TOTAL DE CARTAS EN MASO DE JUGADORES             ");
  console.log("                                                                            ");
  console.log(`        ${nombre_jug1} y Jug. 3 = ${equipo1_maso} cartas | Jug. 2 y Jug. 4 = ${equipo2_maso} cartas     `);
  console.log(`              Pts ganados = ${sumar_pts_cartas_1}pts  |  Pts ganados = ${sumar_pts_cartas_2}pts              `);
  console.log("                                                                             ");

  if (total_equipo1 >= 24 && total_equipo2 < 24 || total_equipo2 >= 24 && total_equipo1 < 24) {
    console.log("_____________________________________________________________________________");
    console.log("                                                                             ");
    console.log("                               GANADORES                              ");
    console.log("                                                                             ");

    if (total_equipo1 > total_equipo2) {
      console.log("                               EQUIPO 1                               ");
    } else {
      console.log("                               EQUIPO 2                               ");
    }

    console.log("                                                                             ");
    console.log("#############################################################################");
    console.log("Pulsa Enter para continuar...");
    input();
    pts1 = sumar_pts_cartas_1 + pts1;
    pts2 = sumar_pts_cartas_2 + pts2;
    return true;
  } else {
    console.log("_____________________________________________________________________________");
    console.log("                                                                             ");

    if (total_equipo1 > total_equipo2) {
      console.log("                               EQUIPO 1                               ");
      console.log(`                         ARRIBA CON ${total_equipo1}pts                           `);
      console.log("                               EQUIPO 2                               ");
      console.log(`                                ${total_equipo2}pts                           `);
      pts1 = sumar_pts_cartas_1 + pts1;
      pts2 = sumar_pts_cartas_2 + pts2;
    } else {
      console.log("                               EQUIPO 2                               ");
      console.log(`                         ARRIBA CON ${total_equipo2}pts                           `);
      console.log("                               EQUIPO 1                               ");
      console.log(`                                ${total_equipo1}pts                           `);
      pts1 = sumar_pts_cartas_1 + pts1;
      pts2 = sumar_pts_cartas_2 + pts2;
    }

    console.log("                                                                             ");
    console.log("_____________________________________________________________________________");
    console.log("                                                                             ");
    console.log("                               Mezclando                              ");
    console.log("                                cartas                                ");
    console.log("                                                                             ");
    console.log("#############################################################################");
    pts1 = sumar_pts_cartas_1 + pts1;
    pts2 = sumar_pts_cartas_2 + pts2;
    console.log(" Pulsa Enter para continuar...");
    input();
    return false;
  }
}

function reset_partida() {
  mesa.clear();
  mesa_valor.clear();
  jug1.clear();
  jug2.clear();
  jug3.clear();
  jug4.clear();
  maso_jugador1 = 0;
  maso_jugador2 = 0;
  maso_jugador3 = 0;
  maso_jugador4 = 0;
  maso_revuelto = sample(range(0, 40), 40);
}

function quien_se_lleva_mesa() {
  var i;

  if (ultimo_dejar_carta_mesa_id === 1) {
    i = mesa.length;
    maso_jugador1 = maso_jugador1 + i;
    console.log("");
    console.log(`  ${nombre_jug1} se lleva la mesa + ${i} a su maso`);
    console.log("");
    console.log("Pulsa Enter para continuar...");
    input();
  } else {
    if (ultimo_dejar_carta_mesa_id === 2) {
      i = mesa.length;
      maso_jugador2 = maso_jugador2 + i;
      console.log("");
      console.log(` El jugador ${ultimo_dejar_carta_mesa_id} se lleva la mesa + ${i} a su maso`);
      console.log("");
      console.log("Pulsa Enter para continuar...");
      input();
    } else {
      if (ultimo_dejar_carta_mesa_id === 3) {
        i = mesa.length;
        maso_jugador3 = maso_jugador3 + i;
        console.log("");
        console.log(` El jugador ${ultimo_dejar_carta_mesa_id} se lleva la mesa + ${i} a su maso`);
        console.log("");
        console.log("Pulsa Enter para continuar...");
        input();
      } else {
        if (ultimo_dejar_carta_mesa_id === 4) {
          i = mesa.length;
          maso_jugador4 = maso_jugador4 + i;
          console.log("");
          console.log(` El jugador ${ultimo_dejar_carta_mesa_id} se lleva la mesa + ${i} a su maso`);
          console.log("");
          console.log("Pulsa Enter para continuar...");
          input();
        }
      }
    }
  }
}

function comprobar_canto_jug(cartas_jug, turno_id) {
  let canto, cartas_jug_valor, pts_canto;
  cartas_jug_valor = mano_a_valor(cartas_jug);
  pts_canto = 0;
  canto = [0, 0, 0, 0];
  canto = patrulla(cartas_jug_valor, turno_id);

  if (canto[0] === 0) {
    canto = registro(cartas_jug_valor, turno_id);
  }

  if (canto[0] === 0) {
    canto = ronda_vigia_tribilin(cartas_jug_valor, turno_id);
  }

  return canto;
}

function ronda_vigia_tribilin(cartas_jug_valor, turno_id) {
  let canto, i, index_carta_canto, nombre_canto, pts_canto, valor_carta_canto, valor_carta_canto_mas, valor_carta_canto_menos;
  pts_canto = 0;
  canto = [0, 0, 0, 0];
  cartas_jug_valor.sort();
  valor_carta_canto = 0;

  if (cartas_jug_valor[0] === cartas_jug_valor[1] && cartas_jug_valor[0] === cartas_jug_valor[2] && cartas_jug_valor[1] === cartas_jug_valor[2]) {
    pts_canto = 24;
    nombre_canto = "Triblin mata partida";
    i = cartas_jug_valor[0] + cartas_jug_valor[1] + cartas_jug_valor[2];
    canto = [pts_canto, i, turno_id, nombre_canto];
    console.log("");
    console.log(`            El Jugador ${turno_id} tiene ${nombre_canto}        `);
    console.log("");
    return canto;
  }

  if (cartas_jug_valor[0] === cartas_jug_valor[1] || cartas_jug_valor[1] === cartas_jug_valor[2]) {
    if (cartas_jug_valor[0] === cartas_jug_valor[1]) {
      valor_carta_canto = cartas_jug_valor[0];
      index_carta_canto = 0;
    } else {
      if (cartas_jug_valor[1] === cartas_jug_valor[2]) {
        valor_carta_canto = cartas_jug_valor[1];
        index_carta_canto = 1;
      }
    }

    valor_carta_canto_mas = valor_carta_canto + 1;
    valor_carta_canto_menos = valor_carta_canto - 1;

    if (index_carta_canto === 0) {
      if (valor_carta_canto_mas === cartas_jug_valor[2]) {
        pts_canto = 7;
        i = cartas_jug_valor[0] + cartas_jug_valor[1] + cartas_jug_valor[2];
        nombre_canto = "Vigia";
        canto = [pts_canto, i, turno_id, nombre_canto];
        console.log(`          El Jugador ${turno_id} tiene ${nombre_canto}           `);
        console.log("");
        return canto;
      }
    } else {
      if (index_carta_canto === 1) {
        if (valor_carta_canto_mas === cartas_jug_valor[0]) {
          pts_canto = 7;
          i = cartas_jug_valor[0] + cartas_jug_valor[1] + cartas_jug_valor[2];
          nombre_canto = "Vigia";
          canto = [pts_canto, i, turno_id, nombre_canto];
          console.log("");
          console.log(`          El Jugador ${turno_id} tiene ${nombre_canto}           `);
          console.log("");
          return canto;
        }
      } else {
        if (index_carta_canto === 0) {
          if (valor_carta_canto_menos === cartas_jug_valor[2]) {
            pts_canto = 7;
            i = cartas_jug_valor[0] + cartas_jug_valor[1] + cartas_jug_valor[2];
            nombre_canto = "Vigia";
            canto = [pts_canto, i, turno_id, nombre_canto];
            console.log(`          El Jugador ${turno_id} tiene ${nombre_canto}           `);
            console.log("");
            return canto;
          }
        } else {
          if (index_carta_canto === 1) {
            if (valor_carta_canto_menos === cartas_jug_valor[0]) {
              pts_canto = 7;
              i = cartas_jug_valor[0] + cartas_jug_valor[1] + cartas_jug_valor[2];
              nombre_canto = "Vigia";
              canto = [pts_canto, i, turno_id, nombre_canto];
              console.log("");
              console.log(`          El Jugador ${turno_id} tiene ${nombre_canto}           `);
              console.log("");
              return canto;
            }
          }
        }
      }
    }

    if (canto[0] === 0 && valor_carta_canto > 0) {
      if (valor_carta_canto >= 1 && valor_carta_canto <= 7) {
        pts_canto = 1;
        i = cartas_jug_valor[0] + cartas_jug_valor[1] + cartas_jug_valor[2];
        nombre_canto = "Ronda";
        canto = [pts_canto, i, turno_id, nombre_canto];
        console.log("");
        console.log(`          El Jugador ${turno_id} tiene ${nombre_canto}           `);
        console.log("");
        return canto;
      } else {
        if (valor_carta_canto === 10) {
          pts_canto = 2;
          i = cartas_jug_valor[0] + cartas_jug_valor[1] + cartas_jug_valor[2];
          nombre_canto = "Ronda";
          canto = [pts_canto, i, turno_id, nombre_canto];
          console.log("");
          console.log(`          El Jugador ${turno_id} tiene ${nombre_canto}           `);
          return canto;
        } else {
          if (valor_carta_canto === 11) {
            pts_canto = 3;
            i = cartas_jug_valor[0] + cartas_jug_valor[1] + cartas_jug_valor[2];
            nombre_canto = "Ronda";
            canto = [pts_canto, i, turno_id, nombre_canto];
            console.log("");
            console.log(`          El Jugador ${turno_id} tiene ${nombre_canto}           `);
            return canto;
          } else {
            if (valor_carta_canto === 12) {
              pts_canto = 4;
              i = cartas_jug_valor[0] + cartas_jug_valor[1] + cartas_jug_valor[2];
              nombre_canto = "Ronda";
              canto = [pts_canto, i, turno_id, nombre_canto];
              console.log("");
              console.log(`          El Jugador ${turno_id} tiene ${nombre_canto}           `);
              console.log("");
              return canto;
            }
          }
        }
      }
    }
  } else {
    return canto;
  }
}

function patrulla(cartas_jug_valor, turno_id) {
  let canto, carta_0, carta_1, carta_2, i, nombre_canto, pts_canto;
  pts_canto = 0;
  canto = [0, 0, 0, 0];
  cartas_jug_valor.sort();
  carta_1 = cartas_jug_valor[1];
  carta_0 = carta_1 - 1;
  carta_2 = carta_1 + 1;

  if (carta_0 === cartas_jug_valor[0] && carta_2 === cartas_jug_valor[2]) {
    pts_canto = 6;
    i = cartas_jug_valor[0] + cartas_jug_valor[1] + cartas_jug_valor[2];
    nombre_canto = "Patrulla";
    canto = [pts_canto, i, turno_id, nombre_canto];
    console.log("");
    console.log(`          El Jugador ${turno_id} tiene ${nombre_canto}           `);
    console.log("");
    return canto;
  } else {
    return canto;
  }
}

function registro(cartas_jug_valor, turno_id) {
  let canto, i, nombre_canto, pts_canto;
  pts_canto = 0;
  canto = [0, 0, 0, 0];
  cartas_jug_valor.sort();

  if (cartas_jug_valor[0] === 1 && cartas_jug_valor[1] === 11 && cartas_jug_valor[2] === 12) {
    pts_canto = 12;
    i = cartas_jug_valor[0] + cartas_jug_valor[1] + cartas_jug_valor[2];
    nombre_canto = "Registro";
    canto = [pts_canto, i, turno_id, nombre_canto];
    console.log("");
    console.log(`          El Jugador ${turno_id} tiene ${nombre_canto}           `);
    console.log("");
    return canto;
  } else {
    return canto;
  }
}

function canto_mayor(repartidor) {
  let dup, id_ganador, j, k, max_pts, max_sumvalor, newlist, nombre_canto, orden_id, orden_nombre_canto, orden_pts, orden_sumvalor, pts, rep;
  orden_pts = [canto_jug1[0], canto_jug2[0], canto_jug3[0], canto_jug4[0]];
  orden_sumvalor = [canto_jug1[1], canto_jug2[1], canto_jug3[1], canto_jug4[1]];
  orden_id = [canto_jug1[2], canto_jug2[2], canto_jug3[2], canto_jug4[2]];
  orden_nombre_canto = [canto_jug1[3], canto_jug2[3], canto_jug3[3], canto_jug4[3]];
  pts = 0;
  id_ganador = 0;
  max_pts = max(orden_pts);
  dup = 0;

  for (var i, _pj_c = 0, _pj_a = orden_pts, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    i = _pj_a[_pj_c];

    if (max_pts === i) {
      dup = dup + 1;
    }
  }

  if (dup === 1) {
    j = orden_pts.index(max_pts);
    id_ganador = j + 1;
    nombre_canto = orden_nombre_canto[j];
    pts = max_pts;
    console.log(" ");
    console.log("###############################################################################");
    console.log("#                                                                             #");
    console.log(`  El canto del Jugador ${id_ganador} es el ganador con ${nombre_canto}, ${pts}pts  `);
    console.log("#                                                                             #");
    console.log("###############################################################################");
    console.log(" ");
    return [pts, id_ganador];
  } else {
    if (dup === 2) {
      max_sumvalor = max(orden_sumvalor);
      dup = 0;

      for (var i, _pj_c = 0, _pj_a = orden_pts, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
        i = _pj_a[_pj_c];

        if (max_sumvalor === i) {
          dup = dup + 1;
        }
      }

      if (dup === 0) {
        j = orden_sumvalor.index(max_sumvalor);
        id_ganador = j + 1;
        nombre_canto = orden_nombre_canto[j];
        pts = max_pts;
        console.log(" ");
        console.log("###############################################################################");
        console.log("#                                                                             #");
        console.log(`  El canto del Jugador ${id_ganador} es el ganador con ${nombre_canto}, ${pts}pts  `);
        console.log("#                                                                             #");
        console.log("###############################################################################");
        console.log(" ");
        return [pts, id_ganador];
      } else {
        rep = repartidor + 1;
        orden_id.append(rep);
        orden_id.sort();
        k = 0;

        while (k <= orden_id.length) {
          for (var i, _pj_c = 0, _pj_a = orden_id, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
            i = _pj_a[_pj_c];

            if (i === 0) {
              orden_id.remove(0);
            }
          }

          k = k + 1;
        }

        newlist = [];
        dup = 0;

        for (var i, _pj_c = 0, _pj_a = orden_id, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
          i = _pj_a[_pj_c];

          if (!_pj.in_es6(i, newlist)) {
            newlist.append(i);
          } else {
            dup = i;
          }
        }

        if (dup === 0 && rep <= 3) {
          id_ganador = orden_id.slice(-1)[0];
          j = id_ganador - 1;
          nombre_canto = orden_nombre_canto[j];
          pts = max_pts;
          console.log(" ");
          console.log("###############################################################################");
          console.log("#                                                                             #");
          console.log(`  El canto del Jugador ${id_ganador} es el ganador con ${nombre_canto}, ${pts}pts  `);
          console.log("#                                                                             #");
          console.log("###############################################################################");
          console.log(" ");
          return [pts, id_ganador];
        } else {
          if (dup === rep) {
            orden_id.remove(rep);

            if (rep === orden_id[0]) {
              id_ganador = orden_id.slice(-1)[0];
              j = id_ganador - 1;
              nombre_canto = orden_nombre_canto[j];
              pts = max_pts;
              console.log(" ");
              console.log("###############################################################################");
              console.log("#                                                                             #");
              console.log(`  El canto del Jugador ${id_ganador} es el ganador con ${nombre_canto}, ${pts}pts  `);
              console.log("#                                                                             #");
              console.log("###############################################################################");
              console.log(" ");
              return [pts, id_ganador];
            } else {
              id_ganador = orden_id[0];
              j = id_ganador - 1;
              nombre_canto = orden_nombre_canto[j];
              pts = max_pts;
              console.log(" ");
              console.log("###############################################################################");
              console.log("#                                                                             #");
              console.log(`  El canto del Jugador ${id_ganador} es el ganador con ${nombre_canto}, ${pts}pts  `);
              console.log("#                                                                             #");
              console.log("###############################################################################");
              console.log(" ");
              return [pts, id_ganador];
            }
          }
        }
      }
    }
  }

  return [pts, id_ganador];
}

function revisar_pts() {

  if (equipo1_pts >= 24 && equipo2_pts < 24 || equipo2_pts >= 24 && equipo1_pts < 24) {
    system("cls");
    console.log("");
    console.log("##############################################################################");
    console.log("                                                                            ");
    console.log("                              TABLA DE PUNTUAJE                             ");
    console.log("                                                                            ");
    console.log(`            ${nombre_jug1} y Jug. 3 = ${equipo1_pts}pts |  Jug. 2 y Jug. 4 = ${equipo2_pts}pts         `);
    console.log("                                                                            ");
    console.log("______________________________________________________________________________");
    console.log("                                                                            ");
    console.log("                                 GANADORES                                  ");
    console.log("                                                                            ");

    if (equipo1_pts > equipo2_pts) {
      console.log("                                  EQUIPO 1                                  ");
    } else {
      console.log("                                  EQUIPO 2                              ");
    }

    console.log("                                                                            ");
    console.log("##############################################################################");
    console.log("");
    console.log(" Pulsa Enter para continuar...");
    input();
    return true;
  } else {
    return false;
  }
}

function banner_pts() {
  equipo1_pts = pts1 + pts3;
  equipo2_pts = pts2 + pts4;
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log(`         ${nombre_jug1} y Jug. 3 = ${equipo1_pts}pts        |         Jug. 2 y Jug. 4 = ${equipo2_pts}pts         `);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}

function ronda_splash(i) {
  system("cls");
  console.log("");
  console.log("");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  RONDA ${i} @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("");
  console.log(" Presione Enter para continuar...");
  input();
  system("cls");
}

function echar_mesa(repartidor) {
  let escoger_cpu, i, opcion, pts, repartidor2;
  pts = 0;
  escoger_cpu = [1, 4];

  if (repartidor === 0) {
    repartidor2 = repartidor + 2;
  } else {
    if (repartidor === 3) {
      repartidor2 = 1;
    } else {
      if (repartidor === 1 || repartidor === 2) {
        repartidor2 = repartidor + 2;
      }
    }
  }

  while (true) {
    try {
      system("cls");
      console.log("");
      console.log("###############################################################################");
      console.log("#                                                                             #");
      console.log("#                El repartidor apuesta que la mesa empezara por:              #");
      console.log("#                                                                             #");

      if (repartidor !== 0) {
        opcion = Number.parseInt(choice(escoger_cpu));
        console.log(`                                        ${opcion}                                    `);
        console.log("#                                                                             #");
        console.log("###############################################################################");
        console.log(" ");
        console.log("Presione Enter para continuar");
        input();
        break;
      } else {
        console.log("#                              Elige 1 o 4 y pulsa Enter:                     #");
        console.log("#                                                                             #");
        console.log("###############################################################################");
        console.log(" ");
        opcion = Number.parseInt(input("                                      "));

        if (opcion === 1) {
          console.log(" El repartidor apuesta que la mesa empezara por 1 y terminara en 4");
          break;
        } else {
          console.log(" El repartidor apuesta que la mesa empezara por 4 y terminara en 1");
          break;
        }
      }
    } catch (e) {
      continue;
    }
  }

  i = 0;

  while (i <= 4) {
    system("cls");
    console.log("###############################################################################");
    console.log("#                                                                             #");
    console.log("#                                  Cartas                                     #");
    console.log("#                                en la mesa                                   #");
    console.log("#                                                                             #");
    console.log("###############################################################################");
    console.log("");
    console.log("");
    console.log(`        1.-(${valor_carta[mesa[0]]}) ${nombre_carta[mesa[0]]}        `);

    if (opcion === 1 && valor_carta[mesa[0]] === 1) {
      console.log("");
      console.log(" Pego el 1 se te suma 1 pts");
      console.log("");

      if (i === 0) {
        pts += 1;
      }
    } else {
      if (opcion === 4 && valor_carta[mesa[0]] === 4) {
        console.log("");
        console.log(" Pego el 4 se te suma 4 pts");
        console.log("");

        if (i === 0) {
          pts += 4;
        }
      }
    }

    if (i >= 1) {
      console.log(`        2.-(${valor_carta[mesa[1]]}) ${nombre_carta[mesa[1]]}        `);

      if (opcion === 1 && valor_carta[mesa[1]] === 2) {
        console.log("");
        console.log(" Pego el 2 se te suma 2 pts");
        console.log("");

        if (i === 1) {
          pts += 2;
        }
      } else {
        if (opcion === 4 && valor_carta[mesa[1]] === 3) {
          console.log("");
          console.log(" Pego el 3 se te suma 3 pts");
          console.log("");

          if (i === 1) {
            pts += 3;
          }
        }
      }
    }

    if (i >= 2) {
      console.log(`        3.-(${valor_carta[mesa[2]]}) ${nombre_carta[mesa[2]]}        `);

      if (opcion === 1 && valor_carta[mesa[2]] === 3) {
        console.log("");
        console.log(" Pego el 3 se te suma 3 pts");
        console.log("");

        if (i === 2) {
          pts += 3;
        }
      } else {
        if (opcion === 4 && valor_carta[mesa[2]] === 2) {
          console.log("");
          console.log(" Pego el 2 se te suma 2 pts");
          console.log("");

          if (i === 2) {
            pts += 2;
          }
        }
      }
    }

    if (i >= 3) {
      console.log(`        4.-(${valor_carta[mesa[3]]}) ${nombre_carta[mesa[3]]}        `);

      if (opcion === 1 && valor_carta[mesa[3]] === 4) {
        console.log("");
        console.log(" Pego el 4 se te suma 4 pts");
        console.log("");

        if (i === 3) {
          pts += 4;
        }
      } else {
        if (opcion === 4 && valor_carta[mesa[3]] === 1) {
          console.log("");
          console.log(" Pego el 1 se te suma 1 pts");
          console.log("");

          if (i === 3) {
            pts += 1;
          }
        }
      }
    }

    if (i >= 4) {
      if (pts !== 0) {
        console.log("");
        console.log("");
        console.log("______________________________________________________________________________");
        console.log("");
        console.log(`                         El repartidor ha ganado ${pts}pts`);
        console.log("");
        console.log("______________________________________________________________________________");
        console.log("");
        console.log("");

        if (repartidor === 0) {
          pts1 = pts1 + pts;
        } else {
          if (repartidor === 1) {
            pts2 = pts2 + pts;
          } else {
            if (repartidor === 2) {
              pts3 = pts3 + pts;
            } else {
              if (repartidor === 3) {
                pts4 = pts4 + pts;
              }
            }
          }
        }
      } else {
        console.log("");
        console.log("");
        console.log("______________________________________________________________________________");
        console.log("");
        console.log(`     El repartidor no ganado ningun punto. El jugador ${repartidor2} ha ganado 1 pts`);
        pts += 1;

        if (repartidor2 === 1) {
          pts1 = pts1 + pts;
        } else {
          if (repartidor2 === 2) {
            pts2 = pts2 + pts;
          } else {
            if (repartidor2 === 3) {
              pts3 = pts3 + pts;
            } else {
              if (repartidor2 === 4) {
                pts4 = pts4 + pts;
              }
            }
          }
        }

        console.log("");
        console.log("______________________________________________________________________________");
        console.log("");
        console.log("");
      }
    }

    i += 1;
    sleep(1);
  }

  console.log("");
  console.log(" Pulse Enter para continuar");
  input();
}

function obtener_nombre_jug1() {
  let empty_list;
  empty_list = "";

  while (true) {
    try {
      console.log("");
      nombre_jug1 = input("       Ingresa tu nombre y presiona Enter: ");

      if (nombre_jug1 !== empty_list) {
        console.log("");
        console.log(` Bienvenido ${nombre_jug1} seras el Jugador 1 tu companero sera el Jug. 3`);
        console.log("");
        break;
      }
    } catch (e) {
      continue;
    }
  }
}

if (__name__ === "__main__") {
  console.log("");
  console.log("###############################################################################");
  console.log("#                                                                             #");
  console.log("#                      Bienvenido a Caida Command Line                        #");
  console.log("#                                                                             #");
  console.log("#                                                                             #");
  console.log("#                   Para empezar sortearemos el repartidor                    #");
  console.log("#                    repartiremos una carta a cada Jugador                    #");
  console.log("#                         ganara la carta 'mas alta'                          #");
  console.log("#                                                                             #");
  console.log("#                                                                             #");
  console.log("###############################################################################");
  console.log("                                                  Programado por Nestor Ramirez");
  console.log(" ");
  obtener_nombre_jug1();
  console.log(" ");
  console.log(" ");
  console.log(" Pulsa Enter para continuar...");
  input();
  system("cls");
  repartidor = elegir_repartidor();
  system("cls");
  console.log("###############################################################################");
  console.log("#                                                                             #");
  console.log("#                                Revolviendo                                  #");
  console.log("#                                  cartas                                     #");
  console.log("#                                                                             #");
  console.log("###############################################################################");
  sleep(1);
  system("cls");
  repartir_mesa();
  echar_mesa(repartidor);
  ganador_en_juego = juego(repartidor);

  if (ganador_en_juego === false) {
    continuar_partida = resultados();

    while (continuar_partida === false || ganador_en_juego === false) {
      if (repartidor !== 3) {
        repartidor = repartidor + 1;
      } else {
        repartidor = 0;
      }

      reset_partida();
      repartir_mesa();
      ganador_en_juego = juego(repartidor);

      if (ganador_en_juego === false) {
        continuar_partida = resultados();

        if (continuar_partida === true) {
          system("cls");
          console.log("###############################################################################");
          console.log("#                                                                             #");
          console.log("#                                     GAME                                    #");
          console.log("#                                     OVER                                    #");
          console.log("#                                                                             #");
          console.log("###############################################################################");
          console.log("                                                  Programado por Nestor Ramirez");
          input();
          break;
        }
      } else {
        system("cls");
        console.log("###############################################################################");
        console.log("#                                                                             #");
        console.log("#                                     GAME                                    #");
        console.log("#                                     OVER                                    #");
        console.log("#                                                                             #");
        console.log("###############################################################################");
        console.log("                                                  Programado por Nestor Ramirez");
        input();
        break;
      }
    }
  } else {
    system("cls");
    console.log("###############################################################################");
    console.log("#                                                                             #");
    console.log("#                                     GAME                                    #");
    console.log("#                                     OVER                                    #");
    console.log("#                                                                             #");
    console.log("###############################################################################");
    console.log("                                                  Programado por Nestor Ramirez");
    input();
  }
}
