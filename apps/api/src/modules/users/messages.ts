const fallback = {
  userNotFound: {
    en: 'User not found',
    es: 'Usuario no encontrado',
    fr: 'Utilisateur non trouvé',
    de: 'Benutzer nicht gefunden',
    'pt-BR': 'Usuário não encontrado'
  },
  userDeleted: {
    en: 'User deleted',
    es: 'Usuario eliminado',
    fr: 'Utilisateur supprimé',
    de: 'Benutzer gelöscht',
    'pt-BR': 'Usuário excluído'
  },
  unauthorizedUpdate: {
    en: 'You are not authorized to update this user',
    es: 'No estás autorizado para actualizar este usuario',
    fr: "Vous n'êtes pas autorisé à mettre à jour cet utilisateur",
    de: 'Sie sind nicht berechtigt, diesen Benutzer zu aktualisieren',
    'pt-BR': 'Você não tem autorização para atualizar este usuário'
  },
  unauthorizedDelete: {
    en: 'You are not authorized to delete this user',
    es: 'No estás autorizado para eliminar este usuario',
    fr: "Vous n'êtes pas autorisé à supprimer cet utilisateur",
    de: 'Sie sind nicht berechtigt, diesen Benutzer zu löschen',
    'pt-BR': 'Você não tem autorização para excluir este usuário'
  }
}

export const usersMessages = {
  userNotFound: (identifier?: string) =>
    identifier
      ? {
          en: `User '${identifier}' not found`,
          es: `Usuario '${identifier}' no encontrado`,
          fr: `Utilisateur '${identifier}' non trouvé`,
          de: `Benutzer '${identifier}' nicht gefunden`,
          'pt-BR': `Usuário '${identifier}' não encontrado`
        }
      : fallback.userNotFound,

  userDeleted: (identifier?: string) =>
    identifier
      ? {
          en: `User '${identifier}' deleted`,
          es: `Usuario '${identifier}' eliminado`,
          fr: `Utilisateur '${identifier}' supprimé`,
          de: `Benutzer '${identifier}' gelöscht`,
          'pt-BR': `Usuário '${identifier}' excluído`
        }
      : fallback.userDeleted,

  unauthorizedUpdate: () => fallback.unauthorizedUpdate,
  unauthorizedDelete: () => fallback.unauthorizedDelete
}
