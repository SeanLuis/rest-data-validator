/**
 * Valida si una fecha en forma de cadena coincide con un formato dado.
 * Este ejemplo asume el formato 'YYYY-MM-DD'.
 *
 * @param {string} dateString La fecha como cadena para validar.
 * @returns {boolean} Verdadero si la fecha es válida según el formato; de lo contrario, falso.
 */
export function isValidDate(dateString: string): boolean {
    // Expresión regular para validar el formato 'YYYY-MM-DD'
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(dateString)) {
        return false; // La cadena no sigue el formato 'YYYY-MM-DD'
    }

    // Intenta crear un objeto Date y verifica si los componentes coinciden
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    // Verifica si los componentes de la fecha son correctos (meses en JS son 0-indexados)
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        return false; // La fecha no es válida (por ejemplo, 30 de febrero)
    }

    return true; // La fecha es válida
}
