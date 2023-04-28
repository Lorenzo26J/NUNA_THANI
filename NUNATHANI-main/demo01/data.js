module.exports = function () {
  var data = {
    Especialidad: [
      {
        id:1,
        tipoEspecialidad: "Psicología Clínica",
        centroEspecialidad: "UNMSM",
        descripcionEspecialidad:"se centra en el diagnóstico y tratamiento de problemas psicológicos y emocionales",
      },
      {
        id:2,
        tipoEspecialidad: "Psicología Social",
        centroEspecialidad: "PUCP",
        descripcionEspecialidad:"se centra en el estudio de como los individuos interactúan con su entorno social",
      },
      {
        id:3,
        tipoEspecialidad: "Psicología de la Salud",
        centroEspecialidad: "IPCC",
        descripcionEspecialidad:"se centra en el estudio de los factores psicológicos que influyen en la salud y el bienestar",
      },
      {
        id:4,
        tipoEspecialidad: "Psicología Organizacional",
        centroEspecialidad:"UPCH",
        descripcionEspecialidad:"se centra en la aplicación de la psicología a las empresas y organizaciones, incluyendo la selección y capacitación de personal",
      }
    ],
   
    estado: [
      {
        id:1,
        disponibilidad: "Disponible",
      },
      {
        id:2,
        disponibilidad: "No disponible",
      },
      {
        id:3,
        disponibilidad: "Disponible",
      },
      {
        id:4,
        disponibilidad: "Disponible",
      }
    ],
    disponibilidad: [
      {
        id: 1,
        inicio_turno: "08:00",
        fin_turno: "14:00",
        dias_laborales: ["Lunes", "Miércoles", "Viernes"]
      },
      {
        id: 2,
        inicio_turno: "12:00",
        fin_turno: "18:00",
        dias_laborales: ["Miércoles", "Viernes"]
      },
      {
        id: 3,
        inicio_turno: "10:00",
        fin_turno: "16:00",
        dias_laborales: ["Lunes", "Viernes"]
      },
      {
        id: 4,
        inicio_turno: "14:00",
        fin_turno: "20:00",
        dias_laborales: ["Martes", "Jueves"]
      }
    ],
    usuarios: [
      {
        id: 1,
        nameUsuario: "Alvaro",
        SnameUsuario: "Gamonal",
        PassUsuario: "Odontologia",
        telusuario: "990084583"
      },
      {
        id: 2,
        nameUsuario: "Gonzalo",
        SnameUsuario: "Gamonal",
        PassUsuario: "Emergencias",
        telusuario: "988367020"
      },
    ],
    rutinas_recreativas: [
      {
        id:1,
        nombre: "Depresion",
        descripcion: "La depresión se presenta como un trastorno del estado de ánimo que puede manifestarse en el cuerpo con fatiga, tristeza, falta de energía y cambios en el apetito y el sueño. Además, puede generar pensamientos negativos y sentimientos de desesperanza, culpa e inutilidad.",
      },
      {
        id:2,
        nombre: "Estres",
        descripcion: "El estrés se presenta como una respuesta del cuerpo ante situaciones que se perciben como desafiantes o amenazantes. Puede manifestarse en el cuerpo con tensión muscular, aumento de la frecuencia cardíaca y respiración rápida, y también puede afectar emocionalmente, generando sentimientos de irritabilidad, ansiedad y preocupación constante.",
      },
      {
        id:3,
        nombre: "Enfado",
        descripcion: "El enfado se presenta como una emoción intensa y negativa que puede manifestarse en el cuerpo con tensión muscular, aumento de la frecuencia cardíaca y respiración rápida y superficial. Además, puede generar reacciones impulsivas, como gritar, insultar o incluso comportamientos violentos.",
      },
      {
        id:4,
        nombre: "Ansiedad",
        descripcion: "La ansiedad se presenta como una sensación de inquietud y temor intenso que puede manifestarse en el cuerpo con sudoración, palpitaciones, tensión muscular y dificultad para respirar. Además, puede generar pensamientos negativos y preocupaciones excesivas acerca del futuro.",
      }
    ]
    
    
  }
  return data
}
