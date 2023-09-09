export default [
  {
    'id': 277,
    'from': [
      'change_cr'
    ],
    'to': [
      'review_change_cr_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 276,
    'from': [
      'review_change_cr_aq'
    ],
    'to': [
      'change_cr'
    ],
    'color': 'success'
  },
  {
    'id': 275,
    'from': [
      'change_cr',
      'bg_project_changes_approval',
      'bg_project_approval'
    ],
    'to': [
      'changes'
    ],
    'color': 'success'
  },
  {
    'id': 274,
    'from': [
      'changes'
    ],
    'to': [
      'check_tender_3'
    ],
    'color': 'success'
  },
  {
    'id': 273,
    'from': [
      'analys_sd'
    ],
    'to': [
      'review_on_sd'
    ],
    'color': 'info'
  },
  {
    'id': 272,
    'from': [
      'analys_sd'
    ],
    'to': [
      'check_tender_winner'
    ],
    'color': 'success'
  },
  {
    'id': 271,
    'from': [
      'review_on_sd_underwriter_aq'
    ],
    'to': [
      'review_on_sd'
    ],
    'color': 'success'
  },
  {
    'id': 270,
    'from': [
      'review_on_sd'
    ],
    'to': [
      'review_on_sd_underwriter_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 269,
    'from': [
      'review_on_sd'
    ],
    'to': [
      'analys_sd'
    ],
    'color': 'success'
  },
  {
    'id': 267,
    'from': [
      'correspondence_sk_and_kk'
    ],
    'to': [
      'review_on_sd'
    ],
    'color': 'success'
  },
  {
    'id': 266,
    'from': [
      'correspondence_sk_and_kk'
    ],
    'to': [
      'check_tender_winner'
    ],
    'color': 'success'
  },
  {
    'id': 265,
    'from': [
      'correspondence_sk_and_kk',
      'analys_kk'
    ],
    'to': [
      'review_on_kk'
    ],
    'color': 'info'
  },
  {
    'id': 263,
    'from': [
      'analys_kk'
    ],
    'to': [
      'correspondence_sk_and_kk'
    ],
    'color': 'success'
  },
  {
    'id': 262,
    'from': [
      'review_on_sk'
    ],
    'to': [
      'correspondence_sk_and_kk'
    ],
    'color': 'success'
  },
  {
    'id': 261,
    'from': [
      'review_on_kk'
    ],
    'to': [
      'analys_kk'
    ],
    'color': 'success'
  },
  {
    'id': 260,
    'from': [
      'review_on_kk'
    ],
    'to': [
      'review_on_kk_underwriter_aq'
    ],
    'color': 'warning'
  },
  // {
  //   'id': 259,
  //   'from': [
  //     'review_on_kk_underwriter_aq'
  //   ],
  //   'to': [
  //     'review_on_kk'
  //   ],
  //   'color': 'success'
  // },
  {
    'id': 258,
    'from': [
      'is_individual_bg'
    ],
    'to': [
      'check_tender_winner'
    ],
    'color': 'warning'
  },
  {
    'id': 257,
    'from': [
      'is_individual_bg'
    ],
    'to': [
      'review_on_sk',
      'review_on_kk'
    ],
    'color': 'success'
  },
  {
    'id': 255,
    'from': [
      'issuance_docs_set_forming_manager_aq'
    ],
    'to': [
      'issuance_docs_set_forming'
    ],
    'color': 'success'
  },
  {
    'id': 253,
    'from': [
      'check_survey_manager_aq'
    ],
    'to': [
      'check_survey'
    ],
    'color': 'success'
  },
  {
    'id': 252,
    'from': [
      'suspended_offer'
    ],
    'to': [
      'accept_offer_add'
    ],
    'color': 'success'
  },
  {
    'id': 251,
    'from': [
      'check_payment_and_sign_by_issuance_manager_aq'
    ],
    'to': [
      'check_payment_and_sign_by_issuance_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 250,
    'from': [
      'check_payment_and_sign_by_issuance_agent_aq'
    ],
    'to': [
      'check_payment_and_sign_by_issuance_manager_aq'
    ],
    'color': 'success'
  },
  {
    'id': 249,
    'from': [
      'check_payment_and_sign_by_issuance'
    ],
    'to': [
      'check_payment_and_sign_by_issuance_manager_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 248,
    'from': [
      'check_payment_and_sign_by_issuance_manager_aq'
    ],
    'to': [
      'check_payment_and_sign_by_issuance'
    ],
    'color': 'success'
  },
  {
    'id': 247,
    'from': [
      'control_payment_abs'
    ],
    'to': [
      'control_payment_abs_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 246,
    'from': [
      'control_payment_abs_agent_aq'
    ],
    'to': [
      'control_payment_abs'
    ],
    'color': 'success'
  },
  {
    'id': 245,
    'from': [
      'accept_check_list_manager_aq'
    ],
    'to': [
      'accept_check_list_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 244,
    'from': [
      'accept_check_list_agent_aq'
    ],
    'to': [
      'accept_check_list_manager_aq'
    ],
    'color': 'success'
  },
  {
    'id': 243,
    'from': [
      'accept_check_list'
    ],
    'to': [
      'accept_check_list_manager_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 242,
    'from': [
      'accept_check_list_manager_aq'
    ],
    'to': [
      'accept_check_list'
    ],
    'color': 'success'
  },
  {
    'id': 241,
    'from': [
      'issuance_docs_set_forming'
    ],
    'to': [
      'issuance_docs_set_forming_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 240,
    'from': [
      'issuance_docs_set_forming_agent_aq'
    ],
    'to': [
      'issuance_docs_set_forming'
    ],
    'color': 'success'
  },
  {
    'id': 239,
    'from': [
      'atypical_bg_project_forming_manager_aq'
    ],
    'to': [
      'atypical_bg_project_forming_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 238,
    'from': [
      'atypical_bg_project_forming_agent_aq'
    ],
    'to': [
      'atypical_bg_project_forming_manager_aq'
    ],
    'color': 'success'
  },
  {
    'id': 237,
    'from': [
      'atypical_bg_project_forming'
    ],
    'to': [
      'atypical_bg_project_forming_manager_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 236,
    'from': [
      'atypical_bg_project_forming_manager_aq'
    ],
    'to': [
      'atypical_bg_project_forming'
    ],
    'color': 'success'
  },
  {
    'id': 235,
    'from': [
      'bg_project_changes_approval_manager_aq'
    ],
    'to': [
      'bg_project_changes_approval_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 234,
    'from': [
      'bg_project_changes_approval_agent_aq'
    ],
    'to': [
      'bg_project_changes_approval_manager_aq'
    ],
    'color': 'success'
  },
  {
    'id': 233,
    'from': [
      'bg_project_changes_approval'
    ],
    'to': [
      'bg_project_changes_approval_manager_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 232,
    'from': [
      'bg_project_changes_approval_manager_aq'
    ],
    'to': [
      'bg_project_changes_approval'
    ],
    'color': 'success'
  },
  {
    'id': 231,
    'from': [
      'bg_project_approval'
    ],
    'to': [
      'bg_project_approval_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 230,
    'from': [
      'bg_project_approval_agent_aq'
    ],
    'to': [
      'bg_project_approval'
    ],
    'color': 'success'
  },
  {
    'id': 229,
    'from': [
      'domc_underwriting_manager_aq'
    ],
    'to': [
      'domc_underwriting_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 228,
    'from': [
      'domc_underwriting_agent_aq'
    ],
    'to': [
      'domc_underwriting_manager_aq'
    ],
    'color': 'success'
  },
  {
    'id': 227,
    'from': [
      'domc_underwriting'
    ],
    'to': [
      'domc_underwriting_manager_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 226,
    'from': [
      'domc_underwriting_manager_aq'
    ],
    'to': [
      'domc_underwriting'
    ],
    'color': 'success'
  },
  {
    'id': 225,
    'from': [
      'lawyers_dep_conclusion_forming_manager_aq'
    ],
    'to': [
      'lawyers_dep_conclusion_forming_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 224,
    'from': [
      'lawyers_dep_conclusion_forming_agent_aq'
    ],
    'to': [
      'lawyers_dep_conclusion_forming_manager_aq'
    ],
    'color': 'success'
  },
  {
    'id': 223,
    'from': [
      'lawyers_dep_conclusion_forming'
    ],
    'to': [
      'lawyers_dep_conclusion_forming_manager_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 222,
    'from': [
      'lawyers_dep_conclusion_forming_manager_aq'
    ],
    'to': [
      'lawyers_dep_conclusion_forming'
    ],
    'color': 'success'
  },
  {
    'id': 221,
    'from': [
      'security_dep_conclusion_forming_manager_aq'
    ],
    'to': [
      'security_dep_conclusion_forming_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 220,
    'from': [
      'security_dep_conclusion_forming_agent_aq'
    ],
    'to': [
      'security_dep_conclusion_forming_manager_aq'
    ],
    'color': 'success'
  },
  {
    'id': 219,
    'from': [
      'security_dep_conclusion_forming'
    ],
    'to': [
      'security_dep_conclusion_forming_manager_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 218,
    'from': [
      'security_dep_conclusion_forming_manager_aq'
    ],
    'to': [
      'security_dep_conclusion_forming'
    ],
    'color': 'success'
  },
  {
    'id': 217,
    'from': [
      'check_survey'
    ],
    'to': [
      'check_survey_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 216,
    'from': [
      'check_survey_agent_aq'
    ],
    'to': [
      'check_survey'
    ],
    'color': 'success'
  },
  {
    'id': 215,
    'from': [
      'completeness'
    ],
    'to': [
      'completeness_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 214,
    'from': [
      'completeness_agent_aq'
    ],
    'to': [
      'completeness'
    ],
    'color': 'success'
  },
  {
    'id': 213,
    'from': [
      'domc_forming_manager_aq'
    ],
    'to': [
      'domc_forming_agent_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 212,
    'from': [
      'domc_forming_agent_aq'
    ],
    'to': [
      'domc_forming_manager_aq'
    ],
    'color': 'success'
  },
  {
    'id': 211,
    'from': [
      'domc_forming'
    ],
    'to': [
      'domc_forming_manager_aq'
    ],
    'color': 'warning'
  },
  {
    'id': 210,
    'from': [
      'domc_forming_manager_aq'
    ],
    'to': [
      'domc_forming'
    ],
    'color': 'success'
  },
  {
    'id': 204,
    'from': [
      'check_tender_3'
    ],
    'to': [
      'check_sign_domc_2'
    ],
    'color': 'success'
  },
  {
    'id': 203,
    'from': [
      'check_sign_domc_2'
    ],
    'to': [
      'domc_forming'
    ],
    'color': 'info'
  },
  {
    'id': 202,
    'from': [
      'check_sign_domc_2'
    ],
    'to': [
      'forming_offer'
    ],
    'color': 'success'
  },
  {
    'id': 201,
    'from': [
      'check_tender_3'
    ],
    'to': [
      'suspended_offer'
    ],
    'color': 'info'
  },
  {
    'id': 200,
    'from': [
      'changes',
      'accept_offer'
    ],
    'to': [
      'change_cr'
    ],
    'color': 'warning'
  },
  {
    'id': 199,
    'from': [
      'changes',
      'accept_offer_add',
      'accept_offer'
    ],
    'to': [
      'atypical_bg_project_forming'
    ],
    'color': 'warning'
  },
  {
    'id': 198,
    'from': [
      'changes',
      'accept_offer_add',
      'accept_offer'
    ],
    'to': [
      'bg_project_changes_approval'
    ],
    'color': 'warning'
  },
  {
    'id': 197,
    'from': [
      'changes',
      'accept_offer_add',
      'accept_offer'
    ],
    'to': [
      'bg_project_approval'
    ],
    'color': 'warning'
  },
  {
    'id': 196,
    'from': [
      'changes',
      'accept_offer_add',
      'accept_offer'
    ],
    'to': [
      'check_survey'
    ],
    'color': 'info'
  },
  {
    'id': 195,
    'from': [
      'check_payment_and_sign_by_issuance'
    ],
    'to': [
      'issuance'
    ],
    'color': 'success'
  },
  {
    'id': 193,
    'from': [
      'control_payment_abs',
      'control_payment',
      'control_signing'
    ],
    'to': [
      'check_payment_and_sign_by_issuance'
    ],
    'color': 'success'
  },
  {
    'id': 188,
    'from': [
      'accept_check_list'
    ],
    'to': [
      'control_payment_abs',
      'control_payment',
      'control_signing'
    ],
    'color': 'success'
  },
  {
    'id': 185,
    'from': [
      'issuance_docs_set_forming'
    ],
    'to': [
      'accept_check_list'
    ],
    'color': 'success'
  },
  {
    'id': 180,
    'from': [
      'check_sign_domc'
    ],
    'to': [
      'issuance_docs_set_forming'
    ],
    'color': 'success'
  },
  {
    'id': 177,
    'from': [
      'check_sign_domc'
    ],
    'to': [
      'domc_forming'
    ],
    'color': 'info'
  },
  {
    'id': 176,
    'from': [
      'check_tender_2'
    ],
    'to': [
      'check_sign_domc'
    ],
    'color': 'success'
  },
  {
    'id': 175,
    'from': [
      'check_tender_2'
    ],
    'to': [
      'waiting_tender_win'
    ],
    'color': 'danger'
  },
  {
    'id': 174,
    'from': [
      'waiting_tender_win'
    ],
    'to': [
      'check_tender_2'
    ],
    'color': 'info'
  },
  {
    'id': 173,
    'from': [
      'atypical_bg_project_forming'
    ],
    'to': [
      'bg_project_changes_approval'
    ],
    'color': 'success'
  },
  {
    'id': 161,
    'from': [
      'accept_offer_add',
      'accept_offer'
    ],
    'to': [
      'check_tender_2'
    ],
    'color': 'success'
  },
  {
    'id': 8,
    'from': [
      'forming_offer'
    ],
    'to': [
      'accept_offer'
    ],
    'color': 'success'
  },
  {
    'id': 7,
    'from': [
      'check_tender_winner'
    ],
    'to': [
      'suspended_offer'
    ],
    'color': 'warning'
  },
  {
    'id': 6,
    'from': [
      'check_tender_winner'
    ],
    'to': [
      'forming_offer'
    ],
    'color': 'success'
  },
  {
    'id': 5,
    'from': [
      'domc_underwriting',
      'lawyers_dep_conclusion_forming'
    ],
    'to': [
      'is_individual_bg'
    ],
    'color': 'success'
  },
  {
    'id': 4,
    'from': [
      'security_dep_conclusion_forming'
    ],
    'to': [
      'domc_underwriting',
      'lawyers_dep_conclusion_forming'
    ],
    'color': 'success'
  },
  {
    'id': 3,
    'from': [
      'domc_forming'
    ],
    'to': [
      'domc_underwriting'
    ],
    'color': 'success'
  },
  {
    'id': 2,
    'from': [
      'check_survey'
    ],
    'to': [
      'completeness'
    ],
    'color': 'success'
  },
  {
    'id': 1,
    'from': [
      'completeness'
    ],
    'to': [
      'security_dep_conclusion_forming',
      'domc_forming'
    ],
    'color': 'success'
  }
]
