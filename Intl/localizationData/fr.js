export default {
  locale: 'fr',
  messages: {
    addPost: 'Ajouter Poster',
    authorName: 'Nom de l\'auteur',
    by: 'Par',
    createNewPost: 'Créer un nouveau message',
    createNewReply: 'Créer une nouvelle réponse',
    deletePost: 'Supprimer le message',
    deleteReply: 'Supprimer la réponse',
    editReply: 'Modifier la réponse',
    postContent: 'Contenu après',
    postTitle: 'Titre de l\'article',
    replyContent: 'Commentaire...',
    siteTitle: 'MERN blog de démarrage',
    submit: 'Soumettre',
    switchLanguage: 'Changer de langue',
    twitterMessage: 'Nous sommes sur Twitter',
    comment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} (in real app this would be translated to French)`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	} (in real app this would be translated to French)`,
    nestedDateComment: `user {name} {value, plural,
  		  =0 {does not have any comments}
  		  =1 {has # comment}
  		  other {has # comments}
  		} as of {date} (in real app this would be translated to French)`,
  },
};
